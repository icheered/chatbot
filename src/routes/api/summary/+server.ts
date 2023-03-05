import { OPENAI_KEY } from '$env/static/private'
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'
import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import type { Config } from '@sveltejs/adapter-vercel'

export const config: Config = {
	runtime: 'edge'
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		if (!OPENAI_KEY) {
			throw new Error('OPENAI_KEY env variable not set')
		}

		let requestData = await request.json()

		if (!requestData) {
			throw new Error('No request data')
		}


		let requestmessage = `Create a short description of following question or content in 28 characters or less: '${requestData.content}'`
		requestData.content = requestmessage

		const reqMessages: ChatCompletionRequestMessage[] = [requestData.content]

		if (!reqMessages) {
			throw new Error('no messages provided')
		}

		const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${OPENAI_KEY}`
			},
			method: 'POST',
			body: JSON.stringify({
				input: requestmessage
			})
		})

		const moderationData = await moderationRes.json()
		const [results] = moderationData.results

		if (results.flagged) {
			throw new Error('Query flagged by openai')
		}



		const chatRequestOpts = {
			model: 'gpt-3.5-turbo',
			messages: [{ role: "system", content: requestmessage }],
			temperature: 0.9
		}

		return fetch('https://api.openai.com/v1/chat/completions', {
			headers: {
				Authorization: `Bearer ${OPENAI_KEY}`,
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(chatRequestOpts)
		}).then(function (response) {
			// The response is a Response instance.
			// You parse the data into a useable format using `.json()`
			return response.json();
		}).then(function (data) {
			// `data` is the parsed version of the JSON returned from the above endpoint.
			let title: string = data.choices[0].message.content.trim()
			return new Response(JSON.stringify({ title: title }), {
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			})
		});

	} catch (err) {
		console.error(err)
		return json({ error: 'There was an error processing your request' }, { status: 500 })
	}
}

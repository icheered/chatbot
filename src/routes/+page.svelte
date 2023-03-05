<script lang="ts">
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import UserMessage from '$lib/components/UserMessage.svelte'
	import BotMessage from '$lib/components/BotMessage.svelte'
	import TextBox from '$lib/components/TextBox.svelte'
	import type { ChatCompletionRequestMessage } from 'openai'
	import { SSE } from 'sse.js'
	import BackgroundText from '$lib/components/BackgroundText.svelte'

	let query: string = ''

	let answer: string = ''
	let loading: boolean = false
	let chatMessages: ChatCompletionRequestMessage[] = []
	let scrollToDiv: HTMLDivElement

	// function scrollToBottom() {
	// 	setTimeout(function () {
	// 		scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
	// 	}, 100)
	// }

	const handleSubmit = async () => {
		console.log('Handling submit')
		console.log('🚀 ~ file: +page.svelte:10 ~ query:', query)
		loading = true
		chatMessages = [...chatMessages, { role: 'user', content: query }]
		console.log('🚀 ~ file: +page.svelte:26 ~ handleSubmit ~ chatMessages:', chatMessages)

		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages })
		})

		query = ''

		eventSource.addEventListener('error', handleError)

		eventSource.addEventListener('message', (e) => {
			//scrollToBottom()
			try {
				loading = false
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }]
					answer = ''
					return
				}

				const completionResponse = JSON.parse(e.data)
				const [{ delta }] = completionResponse.choices

				if (delta.content) {
					answer = (answer ?? '') + delta.content
				}
			} catch (err) {
				handleError(err)
			}
		})
		eventSource.stream()
		//scrollToBottom()
	}

	function handleError<T>(err: T) {
		loading = false
		query = ''
		answer = ''
		console.error(err)
	}

	let testText = `
	Something
	\`\`\`python
	print("Hello world")
	\`\`\`
	Thats about it
	`
</script>

<div class=" overflow-x-hidden w-full h-full relative">
	<div class="flex h-full flex-1 flex-col">
		<main
			class="relative h-full w-full transition-width  bg-[#343541] flex flex-col items-stretch flex-1"
		>
			<div class="flex flex-col items-center text-sm  overflow-y-auto pb-48 h-full">
				{#if !chatMessages.length}
					<BackgroundText />
				{/if}
				{#each chatMessages as message}
					{#if message.role == 'assistant'}
						<BotMessage text={message.content} />
					{:else if message.role == 'user'}
						<UserMessage text={message.content} />
					{/if}
				{/each}
				{#if answer}
					<BotMessage text={answer} />
				{/if}
				{#if loading}
					<BotMessage text={'Loading'} />
				{/if}
			</div>
		</main>
	</div>
	<TextBox bind:text={query} {handleSubmit} />
</div>

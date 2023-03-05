<script lang="ts">
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import TextBox from '$lib/components/TextBox.svelte'
	import type { ChatCompletionRequestMessage } from 'openai'
	import { SSE } from 'sse.js'
	import BackgroundText from '$lib/components/BackgroundText.svelte'
	import { showRaw } from '$lib/settings'

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
		loading = true
		chatMessages = [...chatMessages, { role: 'user', content: query }]
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
</script>

<div class=" overflow-x-hidden w-full h-full relative">
	<div class="flex h-full flex-1 flex-col">
		<main
			class="relative h-full w-full transition-width  bg-[#343541] flex flex-col items-stretch flex-1"
		>
			<div
				class="flex w-full items-center justify-center gap-1 border-b  p-3  border-gray-900/50 bg-[#40414F] text-gray-300"
			>
				ICheered: Chatbot
			</div>
			<div class="flex flex-col items-center text-sm  overflow-y-auto pb-48 h-full">
				<ChatMessage sender="assistant" text={'Hi, how can I help you?'} />

				{#if !chatMessages.length}
					<BackgroundText />
				{/if}
				{#each chatMessages as message}
					<ChatMessage
						sender={message.role == 'user' ? 'user' : 'assistant'}
						text={message.content}
					/>
				{/each}
				{#if answer}
					<ChatMessage sender="assistant" text={answer} />
				{/if}
				{#if loading}
					<ChatMessage sender="assistant" text="loading..." />
				{/if}
			</div>
		</main>
	</div>
	<TextBox bind:text={query} {handleSubmit} />
</div>

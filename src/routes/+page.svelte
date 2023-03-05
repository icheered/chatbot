<script lang="ts">
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import { chatMessages, thread_id, threads } from '$lib/store'
	import TextBox from '$lib/components/TextBox.svelte'
	import { SSE } from 'sse.js'
	import BackgroundText from '$lib/components/BackgroundText.svelte'
	import Toggle from '$lib/components/Toggle.svelte'
	import { showRaw } from '$lib/settings'
	import { v4 as uuidv4 } from 'uuid'
	import { onMount } from 'svelte'
	import { upsertMessages, getThreads } from '$lib/supabase'

	let query: string = ''
	let answer: string = ''
	let answer_id: string = ''

	let loading: boolean = false

	// let scrollToDiv: HTMLDivElement

	// function scrollToBottom() {
	// 	setTimeout(function () {
	// 		scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
	// 	}, 100)
	// }

	const handleSubmit = async () => {
		loading = true
		$chatMessages = [
			...$chatMessages,
			{ role: 'user', content: query, id: uuidv4(), thread_id: $thread_id }
		]
		const messagesWithoutID = $chatMessages.map(({ role, content }) => ({ role, content }))

		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: messagesWithoutID })
		})
		upsertMessages($chatMessages)
		// If thread_id not in $threads refetch threads
		if (!$threads.find((thread) => thread.thread_id === $thread_id)) {
			$threads = await getThreads()
			console.log($threads)
		}

		query = ''

		eventSource.addEventListener('error', handleError)

		eventSource.addEventListener('message', (e) => {
			//scrollToBottom()
			try {
				loading = false
				if (e.data === '[DONE]') {
					$chatMessages = [
						...$chatMessages,
						{ role: 'assistant', content: answer, id: answer_id, thread_id: $thread_id }
					]
					upsertMessages($chatMessages)
					if (!$threads.find((thread) => thread.thread_id === $thread_id)) {
						getThreads().then((threads) => {
							$threads = threads
						})
						console.log($threads)
					}
					answer = ''
					answer_id = ''
					return
				}
				answer_id = JSON.parse(e.data).id

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

	function handleError(err: any) {
		loading = false
		query = ''
		answer = ''
		console.error(err)
	}

	onMount(() => {
		$thread_id = uuidv4()
		console.log('Starting: ', $thread_id)
	})
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
			<div class="absolute pt-3 flex flex-row justify-center">
				<div class="pr-2">Show raw:</div>
				<Toggle bind:state={$showRaw} />
			</div>
			<div class="flex flex-col items-center text-sm  overflow-y-auto pb-48 h-full">
				<ChatMessage sender="assistant" text={'Hi, how can I help you?'} />

				{#if !$chatMessages.length}
					<BackgroundText />
				{/if}
				{#each $chatMessages as message}
					<ChatMessage
						sender={message.role == 'user' ? 'user' : 'assistant'}
						bind:text={message.content}
					/>
				{/each}
				{#if answer}
					<ChatMessage sender="assistant" bind:text={answer} />
				{/if}
				{#if loading}
					<ChatMessage sender="assistant" text="|" />
				{/if}
			</div>
		</main>
	</div>
	<TextBox bind:text={query} {handleSubmit} />
</div>

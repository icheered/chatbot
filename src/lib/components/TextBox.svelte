<script lang="ts">
	export let text: string
	export let handleSubmit: Function
	import PaperPlaneIcon from '$lib/icons/PaperPlaneIcon.svelte'
	import { onMount } from 'svelte'

	let textarea: any = null

	function handleKeyDown(event: any) {
		console.log(event.key)
		if (event.key === 'Enter') {
			if (!event.shiftKey) {
				handleSubmit()
				text = ''
				event.preventDefault()
				textarea.style.height = `24px`
			}
		}
	}

	onMount(() => {
		textarea = document.getElementById('my-textarea')

		textarea.addEventListener('input', () => {
			textarea.style.height = 'auto'
			textarea.style.height = `${textarea.scrollHeight}px`
		})

		textarea.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' && event.shiftKey) {
				textarea.style.height = `${textarea.scrollHeight + 20}px` // increase height by 20px for new line
			}
		})
	})
</script>

<div
	class="absolute bottom-0 left-0 w-full px-8 border-t-2 p-4 pb-2  border-white/20  md:bg-vert-light-gradient bg-[#343541] md:bg-vert-dark-gradient"
>
	<form
		class="stretch mx-2 flex flex-row gap-3 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl"
		on:submit|preventDefault={() => handleSubmit()}
		on:keydown={handleKeyDown}
	>
		<div class="relative flex h-full flex-1 md:flex-col">
			<div
				class="flex flex-col w-full py-2 flex-grow md:py-3  relative text-white bg-[#40414F] rounded-md shadow-[0_0_15px_rgba(0,0,0,0.10)]"
			>
				<!-- <textarea
					id="my-textarea"
					class="h-auto resize-y m-0 w-full focus-visible:border-0 outline-0 px-2 border-0 focus:border-0 pr-7 focus:ring-0 focus-visible:ring-0 bg-transparent "
					style="max-height: 200px; overflow: hidden; height: 20px;"
					bind:value={text}
				/> -->
				<textarea
					id="my-textarea"
					tabindex="0"
					style="max-height: 200px; height: 24px; overflow-y: hidden;"
					rows="1"
					class="ml-2  m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0 focus-visible:border-0 outline-0"
					bind:value={text}
				/>

				<button
					class="absolute p-1 rounded-md  text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2  hover:text-gray-400 hover:bg-gray-900"
					type="submit"
				>
					<PaperPlaneIcon />
				</button>
			</div>
		</div>
	</form>
</div>

<style>
	textarea:focus-visible {
		border: 0;
		outline: 0;
	}
</style>

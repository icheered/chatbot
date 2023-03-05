<script lang="ts">
	export let text: string
	export let handleSubmit: Function

	function handleKeyDown(event: any) {
		if (event.key === 'Enter') {
			if (!event.shiftKey) {
				handleSubmit()
				text = ''
				event.preventDefault()
			}
		}
	}
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
				<textarea
					class="m-0 w-full resize-none focus-visible:border-0 outline-0 px-2 border-0 focus:border-0 pr-7 focus:ring-0 focus-visible:ring-0 bg-transparent "
					style="max-height: 200px; height: {(1 + (text.match(/\n/g) || []).length) *
						24}px; overflow-y: hidden;"
					bind:value={text}
				/>

				<button
					class="absolute p-1 rounded-md  text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2  hover:text-gray-400 hover:bg-gray-900"
					type="submit"
					><svg
						stroke="currentColor"
						fill="none"
						stroke-width="2"
						viewBox="0 0 24 24"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-4 w-4 mr-1"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
						><line x1="22" y1="2" x2="11" y2="13" /><polygon
							points="22 2 15 22 11 13 2 9 22 2"
						/></svg
					></button
				>
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

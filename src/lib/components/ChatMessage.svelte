<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte'
	import Icon from '$lib/components/Icon.svelte'
	import { showRaw } from '$lib/settings'
	export let text: string
	export let sender: string

	$: isAssistant = sender == 'assistant'
	$: isUser = sender == 'user'

	function getTextArray() {
		// Turn the message into a set of text and codeblocks
		const lines = text.split('\n')
		const textArray = []

		let inCodeBlock = false

		for (const line of lines) {
			if (line.includes('```')) {
				if (!inCodeBlock) {
					textArray.push({
						type: 'code',
						text: line
					})
				} else {
					textArray[textArray.length - 1].text += `\n${line}`
				}
				inCodeBlock = !inCodeBlock
			} else if (inCodeBlock) {
				textArray[textArray.length - 1].text += `\n${line}`
			} else {
				textArray.push({
					type: 'text',
					text: line
				})
			}
		}
		return textArray
	}
</script>

<div
	class={`w-full border-b border-gray-900/50 text-gray-100 group ${
		isAssistant ? 'bg-[#444654]' : 'bg-[#343541]'
	}`}
>
	<div
		class="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0"
	>
		<div class="w-[30px] flex flex-col relative items-end">
			<div
				class="relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center"
				style="background-color: rgb(16, 163, 127);"
			>
				<Icon name={isAssistant ? 'assistant' : 'user'} />
			</div>
		</div>
		<div class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
			<div class="flex flex-grow flex-col gap-3">
				<div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
					{#if $showRaw}
						<p>{text}</p>
					{:else}
						{#each getTextArray() as { type, text }}
							{#if type === 'text'}
								<p>{text}</p>
							{:else}
								<CodeBlock codestring={text} />
							{/if}
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

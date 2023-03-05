<script lang="ts">
	import { HighlightAuto } from 'svelte-highlight'
	import ClipboardIcon from '$lib/icons/ClipboardIcon.svelte'
	import CheckIcon from '$lib/icons/CheckIcon.svelte'
	import atomOneDark from 'svelte-highlight/styles/atom-one-dark'

	export let text: string

	$: language = text.match(/(?<=```)\w+(?=\n)/g) ?? ''
	$: code = (() => {
		let c = text.match(/```[a-zA-Z]*\n(.*[\s\S]*)(?=\n```)/)
		if (c && c.length > 1) {
			console.log('Matched: ', c[1])
			return c[1]
		} else {
			return ''
		}
	})()

	let copied: boolean = false

	function copyToClipboard() {
		navigator.clipboard.writeText(code)
		copied = true
		// setTimeout(() => {
		// 	copied = false
		// }, 3000)
	}
</script>

<svelte:head>
	{@html atomOneDark}
</svelte:head>

<div class="bg-black mb-4 rounded-md overflow-x-hidden w-full">
	<div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans">
		<span>{language}</span>
		<button class="flex flex-row items-center ml-auto gap-2">
			{#if copied}
				<CheckIcon />
				<div>Copied!</div>
			{:else}
				<ClipboardIcon />
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div on:click={copyToClipboard}>Copy code</div>
			{/if}
		</button>
	</div>
	<div class="-mt-6">
		<HighlightAuto {code} />
	</div>
</div>

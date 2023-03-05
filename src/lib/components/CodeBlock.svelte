<script lang="ts">
	import { HighlightAuto } from 'svelte-highlight'
	import ClipboardIcon from '$lib/icons/ClipboardIcon.svelte'
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
</script>

<svelte:head>
	{@html atomOneDark}
</svelte:head>

<div class="bg-black mb-4 rounded-md overflow-x-hidden w-full">
	<div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans">
		<span>{language}</span><button class="flex ml-auto gap-2">
			<ClipboardIcon />
			Copy code
		</button>
	</div>
	<div class="-mt-6">
		<HighlightAuto {code} />
	</div>
</div>

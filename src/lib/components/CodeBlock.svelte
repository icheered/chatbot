<script lang="ts">
	import { HighlightAuto } from 'svelte-highlight'
	import atomOneDark from 'svelte-highlight/styles/atom-one-dark'

	export let codestring: string
	$: console.log('Codestring: ', codestring)

	$: language = codestring.match(/(?<=```)\w+(?=\n)/g) ?? ''
	$: code = (() => {
		let c = codestring.match(/```[a-zA-Z]*\n(.*[\s\S]*)(?=\n```)/)
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
		<span>{language}</span><button class="flex ml-auto gap-2"
			><svg
				stroke="currentColor"
				fill="none"
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="h-4 w-4"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect
					x="8"
					y="2"
					width="8"
					height="4"
					rx="1"
					ry="1"
				/></svg
			>Copy code
		</button>
	</div>
	<div class="-mt-6">
		<HighlightAuto {code} />
	</div>
</div>

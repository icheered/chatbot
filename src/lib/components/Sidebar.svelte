<script lang="ts">
	import PlusIcon from '$lib/icons/PlusIcon.svelte'
	import PromptIcon from '$lib/icons/PromptIcon.svelte'

	import ThreadComponent from '$lib/components/ThreadComponent.svelte'
	import Toggle from '$lib/components/Toggle.svelte'
	import {
		threads,
		thread_id,
		chatMessages,
		new_thread,
		showRaw,
		showSuffixPrompt
	} from '$lib/store'
	import { v4 as uuidv4 } from 'uuid'

	function newChat() {
		$new_thread = true
		$thread_id = uuidv4()
		$chatMessages = []
	}
</script>

<nav class="flex h-full flex-1 flex-col space-y-1 p-2 bg-[#202123]">
	<!-- svelte-ignore a11y-missing-attribute -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<a
		class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20"
		on:click={newChat}
	>
		<PlusIcon />
		New chat
	</a>
	<div class="flex-col flex-1 overflow-y-auto border-b border-white/20 -mr-2">
		<div class="flex flex-col gap-2 text-gray-100 text-sm">
			{#each $threads as thread}
				<ThreadComponent {thread} />
			{/each}
		</div>
	</div>
	<div class="pt-3 flex flex-row justify-center">
		<div class="pr-2">Show raw:</div>
		<Toggle bind:state={$showRaw} />
	</div>
	<div class="flex flex-row justify-center">
		<!-- svelte-ignore a11y-missing-attribute -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<a
			class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
			on:click={() => ($showSuffixPrompt = true)}
		>
			<PromptIcon />
			Set suffix prompt
		</a>
	</div>
</nav>

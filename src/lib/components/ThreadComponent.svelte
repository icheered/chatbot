<script lang="ts">
	import ChatIcon from '$lib/icons/ChatIcon.svelte'
	import EditIcon from '$lib/icons/EditIcon.svelte'
	import TrashIcon from '$lib/icons/TrashIcon.svelte'
	import { getMessages, deleteThread, getThreads } from '$lib/supabase'

	import { thread_id, chatMessages, threads } from '$lib/store'

	export let thread: {
		thread_id: string
		thread_name: string
	}

	function setThread() {
		$thread_id = thread.thread_id
		$chatMessages = []
		getMessages($thread_id).then((messages) => {
			$chatMessages = messages
		})
	}

	function deleteThisThread() {
		deleteThread(thread.thread_id).then((res) => {
			getThreads().then((threads) => {
				$threads = threads
			})
		})
	}
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<a
	class={`group flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 ${
		$thread_id == thread.thread_id ? 'bg-[#343541]' : 'bg-[#202123]'
	}  hover:bg-[#2A2B32] group animate-flash`}
	on:click={setThread}
>
	<ChatIcon />
	<div class="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
		{thread.thread_name}
	</div>
	<div class="absolute flex right-1 z-10 text-gray-300 visible">
		<button class=" p-1 hover:text-white invisible group-hover:visible" on:click={deleteThisThread}>
			<TrashIcon />
		</button>
	</div>
</a>

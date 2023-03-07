<script lang="ts">
	import '../app.css'
	import Sidebar from '$lib/components/Sidebar.svelte'
	import Modal from '$lib/components/Modal.svelte'
	export let data: any

	import { threads, storedSettings } from '$lib/store'
	$threads = data.threads
	$storedSettings = data.settings
</script>

<div class="flex flex-row h-screen w-screen ">
	<Modal />
	<div class="w-80">
		<Sidebar />
	</div>

	<div class="flex flex-grow">
		<slot />
	</div>
</div>

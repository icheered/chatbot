<script lang="ts">
	import '../app.css'
	import Sidebar from '$lib/components/Sidebar.svelte'
	export let data: any

	import { threads } from '$lib/store'
	$threads = data.threads
</script>

<div class="flex flex-row h-screen w-screen ">
	<div>
		<Sidebar />
	</div>

	<div class="flex flex-grow">
		<slot />
	</div>
</div>

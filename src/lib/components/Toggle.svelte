<script lang="ts">
	export let state: boolean
</script>

<label class="relative inline-flex items-center cursor-pointer pt-[0.5px]">
	<input type="checkbox" checked={state} class="sr-only peer" on:change={() => (state = !state)} />
	<div
		class="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer bg-gray-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-[#10A37F] peer-checked:bg-[#10A37F]"
	/>
</label>

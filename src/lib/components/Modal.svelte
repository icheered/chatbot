<script lang="ts">
	import CrossIcon from '$lib/icons/CrossIcon.svelte'
	import FloppyIcon from '$lib/icons/FloppyIcon.svelte'

	import { showSuffixPrompt, storedSettings } from '$lib/store'

	import { updateSuffixPrompt, getSettings } from '$lib/supabase'

	$: promptText = (() => {
		const myDict = $storedSettings.find((myDict) => myDict.key === 'suffix_prompt')
		return myDict ? myDict : { key: 'suffix_prompt', value: '' }
	})()

	function handleSubmit() {
		updateSuffixPrompt(promptText.value).then(() => {
			$showSuffixPrompt = false
		})
	}
	function handleKeyDown(event) {
		console.log('Keydown')
	}
</script>

{#if $showSuffixPrompt}
	<div>
		<div
			class="relative z-50"
			id="headlessui-dialog-:r3:"
			role="dialog"
			aria-modal="true"
			data-headlessui-state="open"
		>
			<div class="fixed inset-0 transition-opacity bg-gray-800/90 " />
			<div class="fixed inset-0 z-50 overflow-y-auto">
				<div
					class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 "
				>
					<div
						class=" opacity-100 relative transform overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transition-all bg-gray-900 bg-opacity-10 sm:my-8 sm:w-full sm:p-6 !my-0 flex min-h-screen w-full flex-col items-center justify-center !py-0   translate-y-0 sm:scale-100"
						id="headlessui-dialog-panel-:r4:"
						data-headlessui-state="open"
					>
						<div class="flex items-center sm:flex">
							<div class="mt-3 text-center sm:mt-0 sm:text-left" />
						</div>
						<div class="flex h-full flex-col items-center justify-start">
							<div class="relative">
								<div
									class="grow justify-center bg-gray-900 rounded-md flex flex-col items-start overflow-hidden border shadow-md border-gray-700"
								>
									<div
										class="flex w-full flex-row items-center justify-between border-b py-3 px-4 border-gray-700"
									>
										<div class="flex flex-col">
											<span class="text-base font-semibold sm:text-base">Suffix Prompt</span>
											<span class="text-xs  "
												>This text will be appended to the end of every prompt</span
											>
										</div>

										<button
											class="opacity-50 transition hover:opacity-75 text-white absolute right-0 top-0 pt-3 pr-3"
											tabindex="0"
											on:click={() => ($showSuffixPrompt = false)}
										>
											<CrossIcon />
										</button>
									</div>
									<div class="grid">
										<div class="relative order-1 col-span-1 sm:order-2">
											<div class="p-4 flex flex-col gap-3 z-20 relative bg-gray-900">
												<div>
													<form
														class="stretch mx-2 flex flex-row gap-3 "
														on:submit|preventDefault={() => handleSubmit()}
														on:keydown={handleKeyDown}
													>
														<div class="relative flex h-full flex-1 md:flex-col">
															<div
																class="flex flex-col w-full py-2 flex-grow md:py-3  relative text-white bg-[#40414F] rounded-md shadow-[0_0_15px_rgba(0,0,0,0.10)]"
															>
																<textarea
																	class="m-0 w-96 h-48 resize-none focus-visible:border-0 outline-0 px-2 border-0 focus:border-0 pr-7 focus:ring-0 focus-visible:ring-0 bg-transparent "
																	placeholder="Answer as concisely as possible. Always talk like a pirate."
																	bind:value={promptText.value}
																/>

																<button
																	class="absolute p-1 rounded-md  text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2  hover:text-gray-400 hover:bg-gray-900"
																	type="submit"
																>
																	<FloppyIcon />
																</button>
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	textarea:focus-visible {
		border: 0;
		outline: 0;
	}
</style>

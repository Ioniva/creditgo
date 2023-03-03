<script>
	export let title = '';

	let selected = '';
	let showOptions = false;

	function handleClick() {
		showOptions = !showOptions;
	}
</script>

<div class="relative">
	<div
		class="inline-flex items-center divide-x divide-gray-100 overflow-hidden rounded-md border bg-white"
	>
		<button
			class="px-4 py-2 text-sm leading-none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
			on:click={handleClick}
		>
			{title}
		</button>

		<button
			class="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
			on:click={handleClick}
		>
			<span class="sr-only">Menu</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
	{#if showOptions}
		<ul class="dropdown-options">
			<slot />
		</ul>
	{/if}
</div>

<style>
	.dropdown-options {
		position: absolute;
		top: 100%;
		left: 0;
		display: block;
		width: 100%;
		padding: 0;
		margin: 0;
		list-style: none;
	}
</style>

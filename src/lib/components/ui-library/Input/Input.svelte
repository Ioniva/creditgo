<script>
	export let value = '';
	export let placeholder = '';
	export let id;
	export let label = '';
	export let type = 'text';
	export let flex = false;
	export let disabled = false;
	export let required = false;
	export let checked = false;
	export let min = 0;
	export let max = 0;
	export let errors;
</script>

<div class="mb-6 w-full group">
	<label class={flex ? 'flex' : ''}>
		{#if type !== 'checkbox'}
			<span class="mr-3">{label}</span>
		{/if}

		{#if type === 'password'}
			<input
				type="password"
				{id}
				name={id}
				{placeholder}
				{required}
				{disabled}
				on:change
				on:blur
				bind:value
			/>
		{:else if type === 'email'}
			<input
				type="email"
				{id}
				name={id}
				{placeholder}
				{required}
				{disabled}
				on:change
				on:blur
				bind:value
			/>
		{:else if type === 'tel'}
			<input
				type="tel"
				{id}
				name={id}
				{placeholder}
				{required}
				{disabled}
				on:change
				on:blur
				bind:value
			/>
		{:else if type === 'number'}
			<input
				type="number"
				{id}
				name={id}
				{min}
				{max}
				{placeholder}
				{required}
				{disabled}
				on:change
				on:blur
				bind:value
			/>
		{:else if type === 'date'}
			<input
				type="date"
				{id}
				name={id}
				{placeholder}
				{required}
				{disabled}
				on:change
				on:blur
				bind:value
			/>
		{:else if type === 'checkbox'}
			<input type="checkbox" {id} name={id} {required} {checked} {disabled} on:change on:blur />
		{:else if type === 'radio'}
			<input
				type="radio"
				{id}
				name={id}
				{placeholder}
				{required}
				{checked}
				{disabled}
				on:change
				on:blur
				bind:value
			/>
		{:else if type === 'text'}
			<input
				type="text"
				{id}
				name={id}
				{placeholder}
				{required}
				{disabled}
				on:change
				on:blur
				bind:value
			/>
		{/if}

		{#if type === 'checkbox'}
			<span class="ml-3">{label}</span>
		{/if}
	</label>
	{#if errors}
		<ul>
			{#each errors as error}
				<label for={id} class="text-red-500 py-0 pt-1">
					{error}
				</label>
			{/each}
		</ul>
	{/if}
</div>

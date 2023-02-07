<script>
	/**
	 * Specify the selected item value
	 * @type {string | number}
	 */
	export let selected = undefined;

	/** Set to `true` to disable the select element */
	export let disabled = false;

	/** Set an id for the select element */
	export let id = 'ccs-' + Math.random().toString(36);

	/**
	 * Specify a name attribute for the select element
	 * @type {string}
	 */
	export let name = undefined;

	import { createEventDispatcher, setContext, afterUpdate } from 'svelte';
	import { writable } from 'svelte/store';

	const dispatch = createEventDispatcher();
	const selectedValue = writable(selected);
	const defaultSelectId = writable(null);
	const defaultValue = writable(null);
	const itemTypesByValue = writable({});

	setContext('Select', {
		selectedValue,
		setDefaultValue: (id, value) => {
			/**
			 * Use the first `SelectItem` value as the
			 * default value if `selected` is `undefined`.
			 */

			if ($defaultSelectId === id) selectedValue.set(value);
			if ($defaultSelectId === null) {
				defaultSelectId.set(id);
				defaultValue.set(value);
			}

			itemTypesByValue.update((types) => ({
				...types,
				[value]: typeof value
			}));
		}
	});

	const handleChange = ({ target }) => {
		let value = target.value;
		if ($itemTypesByValue[value] === 'number') value = Number(value);
		selectedValue.set(value);
	};

	let prevSelected = undefined;

	afterUpdate(() => {
		selected = $selectedValue;

		if (prevSelected !== undefined && selected !== prevSelected) {
			dispatch('change', $selectedValue);
		}

		prevSelected = selected;
	});

	$: selectedValue.set(selected ?? $defaultValue);
</script>

<select {disabled} {id} {name} on:change={handleChange}>
	<slot />
</select>

<script>
	// Slots
	/**
	 * @slot header - Override the auto-generated heading with your own value. Typically a step title.
	 */
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import { enhance, applyAction } from '$app/forms';

	// Props
	/** Indicates the step index value. Should start with 0 (zero) */
	export let index = 0;
	/** When enabled, a lock icon appears and Next button is disabled, preventing progress. */
	export let locked = false;
	/** SSR form action call method */
	export let action = '?';
	export let method = 'POST';

	// export let form;

	// Base Classes
	const cBase = 'grid grid-cols-[32px_1fr] gap-4';
	const cLine = 'w-1 h-full';
	const cLineBackground = 'bg-surface-300-600-token';
	const cNumeral = 'font-bold text-base w-8 h-8 rounded-full flex justify-center items-center';
	const cNumeralBackground = 'bg-surface-300-600-token';
	const cDrawer = 'ml-1 space-y-4';
	const cNav = 'flex items-center space-x-2';
	// Context
	export let dispatch = getContext('dispatch');
	export let active = getContext('active');
	export let length = getContext('length');
	export let rounded = getContext('rounded');
	export let duration = getContext('duration');
	export let clickNavigation = getContext('clickNavigation');
	export let highestStepReached = getContext('highestStepReached');
	// Context (overrides)
	export let color = getContext('color');
	export let background = getContext('background');
	export let buttonClassesBack = getContext('buttonClassesBack');
	export let buttonClassesNext = getContext('buttonClassesNext');
	export let buttonClassesComplete = getContext('buttonClassesComplete');
	export let buttonTextBack = getContext('buttonTextBack');
	export let buttonTextNext = getContext('buttonTextNext');
	export let buttonTextComplete = getContext('buttonTextComplete');

	// Reactive
	$: isLastItem = index === length - 1;
	// clickable & cursor logic
	$: isClickable = clickNavigation && index <= $highestStepReached;
	$: classCursor = isClickable ? 'cursor-pointer' : 'cursor-default';
	$: btnTabindex = isClickable ? 0 : -1;
	// Base
	$: classesBase = `${cBase} ${$$props.class ?? ''}`;
	// Timeline (line)
	$: classesLineBackgroundColor = index < $active ? `${background}` : `${cLineBackground}`;
	$: classesLineBackground = !isLastItem ? `${classesLineBackgroundColor}` : '';
	$: classesLine = `${cLine} ${classesLineBackground}`;
	// Timeline (numeral)
	$: classesNumeralBackground =
		index <= $active ? `${color} ${background}` : `${cNumeralBackground}`;
	$: classesNumeral = `${cNumeral} ${classesNumeralBackground} ${rounded} ${classCursor}`;
	// Content Drawer
	$: classesDrawerPadding = !isLastItem ? 'pb-10' : '0';
	$: classesDrawer = `${cDrawer} ${classesDrawerPadding}`;
	// Content Nav
	$: classesNav = `${cNav}`;

	// Step Handlers
	function stepPrev() {
		active.set($active - 1);
		/** @event {{ event }} previous - Fires when the component the Next step button is pressed.  */
		dispatch('previous', {});
	}

	function stepNext() {
		active.set($active + 1);
		/** @event {{ event }} next - Fires when the component the Previous step button is pressed.  */
		dispatch('next', {});
	}

	function onComplete() {
		console.log('Is completed!');
		/** @event {{ event }} complete - Fires when the component the Complete button is pressed.  */
		dispatch('complete', {});
	}

	function stepToIndex() {
		if (isClickable) active.set(index);
	}

	function handleSubmit() {
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				await applyAction(result);
			}

			if (result.type === 'success') {
				await applyAction(result);
				stepNext();
			}
		};
	}
	$: visible = index === $active;
</script>

<div class="step {classesBase}" data-testid="step">
	<!-- Timeline -->
	<div class="step-timeline flex flex-col items-center">
		<!-- Numeral -->
		<button
			class="step-numeral flex-none {classesNumeral}"
			class:cursor-pointer={isClickable}
			tabindex={btnTabindex}
			on:click={stepToIndex}
			on:keypress
		>
			{#if locked}
				<svg
					class="fill-token w-3 aspect-square"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
				>
					<path
						d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
					/>
				</svg>
			{:else}
				{@html index < $active ? '&check;' : index + 1}
			{/if}
		</button>
		<!-- Line -->
		{#if !isLastItem}<div class="step-line {classesLine}" />{/if}
	</div>
	<!-- Content -->
	<div class="step-content {classesDrawer}">
		<!-- Slot: Header -->
		<header
			class="step-header"
			class:cursor-pointer={isClickable}
			on:click={stepToIndex}
			on:keypress
		>
			<slot name="header">
				<h4>Step {index + 1}</h4>
			</slot>
		</header>
		<!-- {#if index === $active} -->
		<div
			class="step-body space-y-4 {visible ? '' : 'hidden'}"
			transition:slide|local={{ duration }}
		>
			<form {action} {method} use:enhance={handleSubmit}>
				<slot name="form" />

				<input type="hidden" name="isLast" value={isLastItem} />

				<!-- Nav -->
				{#if index !== 0}
					<button type="button" class={buttonClassesBack} on:click={stepPrev}>
						{@html buttonTextBack}
					</button>
				{/if}

				{#if $active + 1 < length}
					<button type="submit" class={buttonClassesNext} disabled={locked}>
						{@html buttonTextNext}
					</button>
				{:else}
					<button
						type="submit"
						class={buttonClassesComplete}
						on:click={onComplete}
						disabled={locked}
					>
						{@html buttonTextComplete}
					</button>
				{/if}
			</form>
		</div>
		<!-- {/if} -->
	</div>
</div>

<style>
	.hidden {
		display: none;
	}
</style>

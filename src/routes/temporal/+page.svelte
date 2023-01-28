<script>
	import { writable } from 'svelte/store';

	import Step from '../../lib/components/ui-library/Stepper/Step.svelte';
	import Stepper from '../../lib/components/ui-library/Stepper/Stepper.svelte';
	import Input from '../../lib/components/ui-library/Input/Input.svelte';
	import Account from './Account.svelte';

	export let active = writable(0);
	export let form;

	const onComplete = () => {
		// console.log(form);
	};
</script>

<div class="container mx-auto">
	<h1 class="my-8">Register page</h1>
	<Stepper {active} length={2} on:complete={onComplete}>
		<Step index={0} action="?/login" method="POST" duration="3000">
			<svelte:fragment slot="header">
				<span class="text-3xl font-bold">Datos de tu cuenta</span>
			</svelte:fragment>

			<svelte:fragment slot="form">
				<Account errors={form?.errors} />
			</svelte:fragment>
		</Step>
		<Step index={1} action="?/example" method="POST">
			<svelte:fragment slot="header">
				<span class="text-3xl font-bold">Datos personales</span>
			</svelte:fragment>

			<svelte:fragment slot="form">
				<h2>Form 2</h2>
			</svelte:fragment>
		</Step>
	</Stepper>
</div>

<script>
	import { writable } from 'svelte/store';

	import Step from '../../lib/components/ui-library/Stepper/Step.svelte';
	import Stepper from '../../lib/components/ui-library/Stepper/Stepper.svelte';
	// import Account from './Account.svelte';
	// import Personal from '../../lib/components/register/Personal.svelte';
	// import AdditionalData from '../../lib/components/register/old/AdditionalData.svelte';
	import ReferenceData from '../../lib/components/register/old/ReferenceData.svelte';

	export let active = writable(0);
	export let form;

	const onComplete = () => alert('Se ha registrado correctamente!');
</script>

<div class="container mx-auto">
	<h1 class="my-8">Register page</h1>
	<Stepper {active} length={2} on:complete={onComplete}>
		<Step index={0} action="?/handleAccount" method="POST">
			<svelte:fragment slot="header">
				<span class="text-3xl font-bold">Datos adicionales</span>
			</svelte:fragment>
			<svelte:fragment slot="form">
				<ReferenceData />
				<!-- <Personal errors={form?.errors} /> -->
				<!-- <Account errors={form?.errors} /> -->
			</svelte:fragment>
		</Step>
		<Step index={1} action="?/profile" method="POST">
			<svelte:fragment slot="header">
				<span class="text-3xl font-bold">Datos personales</span>
			</svelte:fragment>
			<svelte:fragment slot="form">
				<h2>Form 2</h2>
			</svelte:fragment>
		</Step>
	</Stepper>
</div>

<script>
	// import { Step, Stepper } from "@skeletonlabs/skeleton";
	import Step from '../../lib/components/ui-library/Stepper/Step.svelte';
	import Stepper from '../../lib/components/ui-library/Stepper/Stepper.svelte';
	import { writable } from 'svelte/store';
	import AccountData from '../../lib/components/register/AccountData.svelte';
	import AdditionalData from '../../lib/components/register/AdditionalData.svelte';
	import PersonalData from '../../lib/components/register/PersonalData.svelte';
	import ReferenceData from '../../lib/components/register/ReferenceData.svelte';

	const active = writable(0);
	const onComplete = () => alert('Has completado!');
</script>

<div class="container mx-auto">
	<h1 class="my-8">Register page</h1>
	<Stepper {active} length={2} on:complete={onComplete}>
		<Step index={0}>
			<svelte:fragment slot="header">
				<span class="text-3xl font-bold">Datos de tu cuenta</span>
			</svelte:fragment>
			<svelte:fragment slot="form">
				<AccountData />
			</svelte:fragment>
		</Step>
		<Step index={1}>
			<svelte:fragment slot="header">
				<span class="text-3xl font-bold">Datos personales</span>
			</svelte:fragment>
			<svelte:fragment slot="form">
				<PersonalData />
			</svelte:fragment>
		</Step>
		<!-- <Step index={2}>
			<svelte:fragment slot="header">
				<span class="text-3xl font-bold">Datos adicionales</span>
			</svelte:fragment>
			<AdditionalData />
		</Step>
		<Step index={3}>
			<svelte:fragment slot="header">
				<span class="text-3xl font-bold">Referencia (fiador)</span>
			</svelte:fragment>
			<ReferenceData />
		</Step> -->
	</Stepper>
</div>

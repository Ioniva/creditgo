<script>
	import { writable } from 'svelte/store';
	import Personal from '../../lib/components/register/Personal.svelte';
	import Account from '../../lib/components/register/Account.svelte';

	import Step from '../../lib/components/ui-library/Stepper/Step.svelte';
	import Stepper from '../../lib/components/ui-library/Stepper/Stepper.svelte';
	import Supplement from '../../lib/components/register/Supplement.svelte';
	import Reference from '../../lib/components/register/Reference.svelte';

	export let active = writable(0);
	export let form;

	const onComplete = () => alert('Se ha registrado correctamente!');
</script>

<div class="container mx-auto">
	<h1 class="my-8">Register page</h1>
	<Stepper {active} length={4} on:complete={onComplete}>
		<Step index={0} action="?/handleAccount" method="POST">
			<svelte:fragment slot="header">
				<span class="text-3xl font-bold">Datos de tu cuenta</span>
			</svelte:fragment>
			<svelte:fragment slot="form">
				<h2>Form 1</h2>
				<Account errors={form?.errors} />
			</svelte:fragment>
		</Step>
		<Step index={1} action="?/handleProfile" method="POST">
			<svelte:fragment slot="header">
				<span class="text-3xl font-bold">Datos personales</span>
			</svelte:fragment>
			<svelte:fragment slot="form">
				<h2>Form 2</h2>
				<Personal errors={form?.errors} />
			</svelte:fragment>
		</Step>
		<Step index={2} action="?/handleSupplement" method="POST">
			<svelte:fragment slot="header">
				<span class="text-3xl font-bold">Datos adicionales</span>
			</svelte:fragment>
			<svelte:fragment slot="form">
				<h2>Form 3</h2>
				<Supplement errors={form?.errors} />
			</svelte:fragment>
		</Step>
		<Step index={3} action="?/handleReference" method="POST">
			<svelte:fragment slot="header">
				<span class="text-3xl font-bold">Datos del aval (garantor)</span>
			</svelte:fragment>
			<svelte:fragment slot="form">
				<h2>Form 4</h2>
				<Reference errors={form?.errors} />
			</svelte:fragment>
		</Step>
	</Stepper>
</div>

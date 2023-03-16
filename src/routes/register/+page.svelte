<script>
	import { writable } from 'svelte/store';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { modalStore } from '@skeletonlabs/skeleton';

	import Stepper from '../../lib/components/ui-library/Stepper/Stepper.svelte';
	import Step from '../../lib/components/ui-library/Stepper/Step.svelte';

	import Personal from '../../lib/components/register/Personal.svelte';
	import Account from '../../lib/components/register/Account.svelte';
	import Supplement from '../../lib/components/register/Supplement.svelte';
	import Reference from '../../lib/components/register/Reference.svelte';
	import { goto } from '$app/navigation';

	export let active = writable(0);
	export let form;

	function triggerErrorToast() {
		const t = {
			message: form?.submitResult?.message || 'Error al crear el usuario',
			preset: 'warning',
			autohide: true,
			timeout: 10000
		};
		toastStore.trigger(t);
	}

	function triggerConfirm() {
		const confirm = {
			type: 'alert',
			title: 'Usuario creado correctamente',
			body: 'Se te redireccionará a la página de inicio de sesión...',
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: (r) => {
				if (r === false) goto('/login'); // false because the button is cancel
			},
			buttonTextCancel: 'Confirmar'
		};
		modalStore.trigger(confirm);
	}

	$: if (form?.submitResult?.success === false) triggerErrorToast();
	$: if (form?.submitResult?.success === true) triggerConfirm();
	// const onComplete = () => alert('Se ha registrado correctamente!');
</script>

<div class="container mx-auto">
	<h1 class="my-8">Register page</h1>
	<Stepper {active} length={4}>
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

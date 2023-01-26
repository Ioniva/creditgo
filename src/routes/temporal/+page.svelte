<script>
	import { writable } from 'svelte/store';
	import { afterUpdate, beforeUpdate, getContext, onMount, setContext } from 'svelte';

	import Input from '../../lib/components/ui-library/Input/Input.svelte';

	import Step from '../../lib/components/ui-library/Stepper/Step.svelte';
	import Stepper from '../../lib/components/ui-library/Stepper/Stepper.svelte';

	export let form;

	const active = writable(0);

	$: isSuccess = form?.success;
	let success = writable(isSuccess);
	afterUpdate(() => {
		success.set(isSuccess);
	});
	setContext('success', success);

	const onComplete = () => alert('Has completado!');
</script>

<div class="container mx-auto">
	<h1 class="my-8">Register page</h1>
	<Stepper {active} length={2} on:complete={onComplete}>
		<!-- <Step index={0}>
            <svelte:fragment slot="header">
                <span class="text-3xl font-bold">Datos de tu cuenta</span>
            </svelte:fragment>
            <h2>Form 1</h2>
            <p>{JSON.stringify(form)}</p>
            <form action="?/login" method="POST" use:enhance>
                <Input type="email" id="email" label="Email" value={form?.data?.email ?? ''} errors={form?.errors?.email}></Input>
                <Input type="password" id="password" label="Password" errors={form?.errors?.password}></Input>

                <button type="submit">Next</button>
            </form>
        </Step> -->
		<Step index={0} action="?/login">
			<svelte:fragment slot="header">
				<span class="text-3xl font-bold">Datos de tu cuenta</span>
			</svelte:fragment>

			<svelte:fragment slot="form">
				<h2>Form 1</h2>
				<Input
					type="email"
					id="email"
					label="Email"
					value={form?.data?.email ?? ''}
					errors={form?.errors?.email}
				/>
				<Input type="password" id="password" label="Password" errors={form?.errors?.password} />
			</svelte:fragment>
		</Step>
		<Step index={1}>
			<svelte:fragment slot="header">
				<span class="text-3xl font-bold">Datos personales</span>
			</svelte:fragment>

			<svelte:fragment slot="content">
				<h2>Form 2</h2>
			</svelte:fragment>
		</Step>
	</Stepper>
</div>

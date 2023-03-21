<script>
	import { modalStore } from '@skeletonlabs/skeleton';
	import { afterUpdate, onMount } from 'svelte';
	import FetchUtil from '../../utils/FetchUtil';

	// Props
	/** Exposes parent props to this component. */
	export let parent;
	export let uuid;

	const submitSolicitation = async () => {
		const url = `http://localhost:4000/api/v1/solicitations/${uuid}`;
		const data = {
			state: 'A'
		};
		return await FetchUtil.patch(url, data);
	};

	// local
	let client = {};

	onMount(async () => {
		client = await getSolicitationByUUID(uuid);
	});

	const getSolicitationByUUID = async () => {
		const url = `http://localhost:4000/api/v1/solicitations/details/${uuid}`;
		const response = await FetchUtil.get(url);
		return await response.solicitation.users[0];
	};

	async function handleConfirmation() {
		const response = await submitSolicitation();

		if (response) {
			$modalStore[0].response({ success: true });
		} else {
			$modalStore[0].response({ error: true });
		}

		modalStore.close();
	}
</script>

<div class="modal-example-form h-full space-y-4">
	<div class="h-1/2">
		<p class="unstyled text-2xl border-b-2 border-blue-700">Datos personales</p>
		<div class="mt-2 flex flex-wrap gap-4">
			<p class="flex-[1_0_auto%]">
				<span class="font-bold">Nombre y apellidos: </span>
				{client.name}
				{client.surname}
			</p>
			<p class="flex-[1_0_auto%]">
				<span class="font-bold">Género: </span>
				{client.genre}
			</p>
			<p class="flex-[2_0_auto%]">
				<span class="font-bold">Cédula: </span>
				{client.cedula}
			</p>
			<p class="flex-[1_0_auto%]">
				<span class="font-bold">F.Exp: </span>
				{client.dispatchDate}
			</p>
			<p class="flex-[1_0_auto%]">
				<span class="font-bold">Lugar Exp: </span>
				{client.dispatchPlace}
			</p>
			<!-- <p class="flex-[1_0_auto%]">
				<span class="font-bold">Fecha de nacimiento: </span>
				{JSON.stringify(client.financial.employeeType)}
			</p> -->
		</div>
	</div>
	<div class="h-1/2">
		<div class="h-1/2 border-blue-700 mt-6">
			<p class="unstyled text-2xl border-b-2 border-blue-700">Datos adicionales</p>
			<div class="mt-2 flex flex-wrap gap-4">
				<p class="flex-[3_0_auto%]">
					<span class="font-bold">Ingreso neto mensual: </span>
					{client.financial ? client.financial.netMonthlyIncome : ''}
				</p>
				<p class="flex-[3_0_auto%]">
					<span class="font-bold">Ingresos adicionales: </span>
					{client.financial ? client.financial.additionalIncome : ''}
				</p>
				<p class="flex-[1_0_auto%]">
					<span class="font-bold">Tipo de empleado: </span>
					<!-- TODO: El employeeType no deberia de estar dentro de financial. no tiene sentido -->
					{client.financial ? client.financial.employeeType.name : ''}
				</p>
			</div>
		</div>
	</div>
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn btn-ghost-surface btn-sm" on:click={parent.onClose}>Volver</button>
		<button class="btn btn-ghost-surface btn-sm bg-green-800" on:click={handleConfirmation}
			>Confirmar prestamo</button
		>
	</footer>
</div>

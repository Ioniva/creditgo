<script>
	import { ListBox, ListBoxItem, modalStore } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import FetchUtil from '../../utils/FetchUtil';

	/** Exposes parent props to this component. */
	export let parent = [];
	export let uuid = '';

	const selectedReason = writable('none');
	let valorations = [];
	let client = {};

	onMount(async () => {
		valorations = await getAllValorations();
		client = await getSolicitationByUUID(uuid);
		console.log(client);
	});

	const getSolicitationByUUID = async () => {
		const url = `http://localhost:4000/api/v1/solicitations/details/${uuid}`;
		const response = await FetchUtil.get(url);
		return await response.solicitation.users[0];
	};

	const getAllValorations = async () => {
		const url = 'http://localhost:4000/api/v1/rejection-reasons';
		const response = await FetchUtil.get(url);
		return response.rejectionReasons;
	};

	const submitSolicitation = async () => {
		const url = `http://localhost:4000/api/v1/solicitations/${uuid}`;
		const data = {
			state: 'R',
			rejectionReason: $selectedReason
		};
		return await FetchUtil.patch(url, data);
	};

	async function handleConfirmation() {
		if ($selectedReason === 'none') return;
		const response = await submitSolicitation();

		if (response) {
			$modalStore[0].response({ success: true });
		} else {
			$modalStore[0].response({ error: true });
		}
		modalStore.close();
	}
</script>

<div class="modal-example-form space-y-4">
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
	<div class="h-1/2">
		<div class="h-1/2 border-blue-700 mt-6">
			<p class="unstyled text-2xl border-b-2 border-blue-700">Selecciona una razón</p>
			<ListBox selected={selectedReason}>
				<ListBoxItem value="none" class="hidden" />
				{#each valorations as valoration}
					<ListBoxItem value={valoration.code}>{valoration.name}</ListBoxItem>
				{/each}
			</ListBox>
		</div>
	</div>
	<!-- prettier-ignore -->
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn btn-ghost-surface btn-sm" on:click={parent.onClose}>Volver</button>
		<button class="btn btn-ghost-surface btn-sm bg-red-800" on:click={handleConfirmation}>Rechazar prestamo</button>
    </footer>
</div>

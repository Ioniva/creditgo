<script>
	import { ListBox, ListBoxItem, modalStore } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import FetchUtil from '../../utils/FetchUtil';

	/** Exposes parent props to this component. */
	export let parent = [];
	export let uuid = '';

	// Store
	const selectedReason = writable('none');

	// Local
	let valorations = [];

	onMount(async () => {
		valorations = await getAllValorations();
	});

	const getAllValorations = async () => {
		const url = 'http://localhost:4000/api/v1/rejection-reasons';
		const response = await FetchUtil.get(url);
		return response.rejectionReasons;
	};

	const submitSolicitation = () => {
		const url = 'http://localhost:4000/api/v1/solicitation';
		const data = {
			uuid: uuid,
			state: 'R',
			rejectionReason: $selectedReason
		};
		FetchUtil.post(url, data);
	};

	async function handleConfirmation() {
		if ($selectedReason === 'none') return;
		// const response = await submitSolicitation();
		const response = { status: 200 };
		if (response.status === 200) {
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
				{parent.name}
				{parent.surname}
			</p>
			<p class="flex-[3_0_auto%]">
				<span class="font-bold">Edad: </span>
				{parent.age}
			</p>
			<p class="flex-[1_0_auto%]">
				<span class="font-bold">Género: </span>
				{parent.gendre}
			</p>
			<p class="flex-[2_0_auto%]">
				<span class="font-bold">Cédula: </span>
				{parent.cedula}
			</p>
			<p class="flex-[1_0_auto%]">
				<span class="font-bold">F.Exp: </span>
				{parent.dispatchDate}
			</p>
			<p class="flex-[1_0_auto%]">
				<span class="font-bold">Lugar Exp: </span>
				{parent.dispatchPlace}
			</p>
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

<script>
	import { toastStore } from '@skeletonlabs/skeleton';
	import {
		createDataTableStore,
		dataTableHandler,
		modalStore,
		Paginator,
		tableA11y,
		tableInteraction
	} from '@skeletonlabs/skeleton';

	import ClientDataPreview from '../../../lib/components/modals/ClientDataPreview.svelte';
	import SelectReasonModal from '../../../lib/components/modals/SelectReasonModal.svelte';
	import { onMount } from 'svelte';
	import FetchUtil from '../../../lib/utils/FetchUtil';

	let solicitations = [];
	let sourceData = [];

	async function fetchData() {
		const data = await FetchUtil.get('http://127.0.0.1:4000/api/v1/solicitations');
		return data.solicitations;
	}

	async function refreshTable() {
		solicitations = await fetchData();
		updateSourceData();
	}

	function updateSourceData() {
		sourceData = [];
		for (const solicitation of solicitations) {
			const user = solicitation.users.map((user) => {
				return `${user.name} ${user.surname}`;
			});

			sourceData.push({
				uuid: solicitation.uuid,
				datetime: solicitation.applicated_at,
				amount: solicitation.amount,
				paymentDays: solicitation.paymentDays,
				names: user,
				status: solicitation.state.name
			});
		}

		dataTableStore.updateSource(sourceData);
	}

	onMount(async () => {
		solicitations = await fetchData();
		updateSourceData();
	});

	const dataTableStore = createDataTableStore(sourceData, {
		sort: '',
		search: '',
		pagination: { offset: 0, limit: 5, size: 0, amounts: [1, 2, 5, 10] }
	});
	dataTableStore.subscribe((model) => dataTableHandler(model));

	function triggerSuccessToast() {
		const t = {
			message: 'Se ha realizado la operación con éxito',
			preset: 'secondary',
			autohide: true,
			timeout: 5000
		};
		toastStore.trigger(t);
	}

	function triggerErrorToast() {
		const t = {
			message: 'Ha ocurrido un error, intente nuevamente',
			preset: 'error',
			autohide: true,
			timeout: 5000
		};
		toastStore.trigger(t);
	}

	function triggerAcceptModal(row) {
		const modalComponent = {
			// Pass a reference to your custom component
			ref: ClientDataPreview,
			// Add your props as key/value pairs
			props: { uuid: row.uuid },
			// Provide default slot content as a template literal
			slot: '<p>Cannot load the data... Try again later.</p>'
		};
		const d = {
			type: 'component',
			component: modalComponent,
			response: (resp) => {
				// TODO: Update the table with the new data
				if (resp.success === true) triggerSuccessToast();
				if (resp.error === true) triggerErrorToast();
				refreshTable();
			}
		};
		modalStore.trigger(d);
	}

	function triggerCancelModal(row) {
		const modalComponent = {
			// Pass a reference to your custom component
			ref: SelectReasonModal,
			// Add your props as key/value pairs
			props: { uuid: row.uuid },
			// Provide default slot content as a template literal
			slot: '<p>Cannot load the data... Try again later.</p>'
		};
		const d = {
			type: 'component',
			component: modalComponent,
			response: (resp) => {
				if (resp.success === true) triggerSuccessToast();
				if (resp.error === true) triggerErrorToast();
				refreshTable();
			}
		};
		modalStore.trigger(d);
	}
</script>

<section class="card !bg-secondary-500/5">
	<!-- Search Input -->
	<div class="card-header inline-flex w-full gap-4">
		<input
			bind:value={$dataTableStore.search}
			type="search"
			class="w-3/4"
			placeholder="Search Table..."
		/>
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-1/4"
			on:click={refreshTable}
		>
			Refresh
		</button>
	</div>

	<!-- Table -->
	<div class="p-4">
		<div class="table-container">
			<!-- prettier-ignore -->
			<table class="table table-hover" role="grid" use:tableInteraction use:tableA11y>
                <thead on:click={(e) => { dataTableStore.sort(e) }} on:keypress>
                    <tr>
                        <th data-sort="datetime">Fecha y hora</th>
                        <th>Cantidad ($)</th>
						<th>Días</th>
                        <th data-sort="client">Nombres</th>
                        <th data-sort="status">Estado</th>
                        <th class="table-cell-fit">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $dataTableStore.filtered as row, rowIndex}
                        <tr class:table-row-checked={row.dataTableChecked} aria-rowindex={rowIndex + 1}>
                            <td role="gridcell" aria-colindex={1} tabindex="0">
                                {row.datetime}
                            </td>
                            <td role="gridcell" aria-colindex={2} tabindex="0">
                                {row.amount}
                            </td>
                            <td role="gridcell" aria-colindex={3} tabindex="0">
                                {row.paymentDays}
                            </td>
                            <td role="gridcell" aria-colindex={4} tabindex="0">
                                {row.names}
                            </td>
                            <td role="gridcell" aria-colindex={5} tabindex="0" class="md:!whitespace-normal capitalize">
                                {row.status}
                            </td>
                            <td role="gridcell" aria-colindex={6} tabindex="0" class="table-cell-fit">
                                <button class="btn btn-ghost-surface btn-sm bg-green-800" on:click={()=>{triggerAcceptModal(row)}}>Aceptar</button>
                                <button class="btn btn-ghost-surface btn-sm bg-red-800" on:click={()=>{triggerCancelModal(row)}}>Rechazar</button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
		</div>
	</div>
	<div class="card-footer">
		<Paginator bind:settings={$dataTableStore.pagination} />
	</div>
</section>

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

	// Local
	// TODO: fetch source data from API
	const sourceData = [
		{
			uuid: 1,
			datetime: 'Nov 3 2021-02-28',
			amount: '$500',
			names: 'Juan  Carlos',
			status: 'good'
		}
	];

	// Store
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
			response: (r) => {
				if (r) console.log('response:', r);
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
				if (resp.success) triggerSuccessToast();
				if (resp.error) triggerErrorToast();
			}
		};
		modalStore.trigger(d);
	}
</script>

<section class="card !bg-secondary-500/5">
	<!-- Search Input -->
	<div class="card-header">
		<input bind:value={$dataTableStore.search} type="search" placeholder="Search Table..." />
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
                                {row.names}
                            </td>
                            <td role="gridcell" aria-colindex={4} tabindex="0" class="md:!whitespace-normal capitalize">
                                {row.status}
                            </td>
                            <td role="gridcell" aria-colindex={5} tabindex="0" class="table-cell-fit">
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

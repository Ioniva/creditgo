<script>
	import {
		createDataTableStore,
		dataTableHandler,
		Paginator,
		tableA11y,
		tableInteraction
	} from '@skeletonlabs/skeleton';
	import Input from '../../../lib/components/ui-library/Input/Input.svelte';
	import Select from '../../../lib/components/ui-library/Select/Select.svelte';
	import SelectItem from '../../../lib/components/ui-library/Select/SelectItem.svelte';

	// Local
	// TODO: fetch source data from API
	const sourceData = [
		{
			uuid: 1,
			applicationDate: '2021-02-28',
			amount: '$500',
			name: 'Juan',
			surname: 'Carlos',
			employeType: 'independiente',
			state: 'pending...' // pending, accepted, rejected
		}
	];

	// Store
	const dataTableStore = createDataTableStore(sourceData, {
		sort: '',
		search: '',
		pagination: { offset: 0, limit: 5, size: 0, amounts: [1, 2, 5, 10] }
	});
	dataTableStore.subscribe((model) => dataTableHandler(model));
</script>

<section class="card !bg-secondary-500/5">
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
                        <th data-sort="applicationDate">Fecha de aplicacion</th>
                        <th data-sort="amount">Cantidad ($)</th>
                        <th data-sort="name">Nombre</th>
                        <th data-sort="surname">Apellido</th>
                        <th data-sort="employeType">Tipo de empleado</th>
                        <th data-sort="status">Estado</th>
                        <!-- <th class="table-cell-fit">Actions</th> -->
                    </tr>
                </thead>
                <tbody>
                    {#each $dataTableStore.filtered as row, rowIndex}
                        <tr class:table-row-checked={row.dataTableChecked} aria-rowindex={rowIndex + 1}>
                            <td role="gridcell" aria-colindex={1} tabindex="0">
                                {row.applicationDate}
                            </td>
                            <td role="gridcell" aria-colindex={2} tabindex="0">
                                {row.amount}
                            </td>
                            <td role="gridcell" aria-colindex={3} tabindex="0">
                                {row.name}
                            </td>
                            <td role="gridcell" aria-colindex={4} tabindex="0">
                                {row.surname}
                            </td>
                            <td role="gridcell" aria-colindex={5} tabindex="0">
                                {row.employeType}
                            </td>
                            <td role="gridcell" aria-colindex={6} tabindex="0" class="md:!whitespace-normal capitalize">
                                {row.state}
                            </td>
                            <!-- <td role="gridcell" aria-colindex={5} tabindex="0" class="table-cell-fit">
                                <button class="btn btn-ghost-surface btn-sm bg-green-800" on:click={()=>{triggerAcceptModal(row)}}>Aceptar</button>
                                <button class="btn btn-ghost-surface btn-sm bg-red-800" on:click={()=>{triggerCancelModal(row)}}>Rechazar</button>
                            </td> -->
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

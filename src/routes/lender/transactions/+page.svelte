<script>
	import {
		Avatar,
		createDataTableStore,
		dataTableHandler,
		modalStore,
		Paginator,
		tableA11y,
		tableInteraction
	} from '@skeletonlabs/skeleton';

	// Local
	const sourceData = [
		{ id: 1, title: 'Hydrogen', body: 'H' },
		{ id: 2, title: 'Helium', body: 'He' },
		{ id: 3, title: 'Lithium', body: 'Li' },
		{ id: 4, title: 'Beryllium', body: 'Be' },
		{ id: 5, title: 'Boron', body: 'B' }
	];

	// Store
	const dataTableStore = createDataTableStore(sourceData, {
		sort: '',
		search: '',
		pagination: { offset: 0, limit: 5, size: 0, amounts: [1, 2, 5, 10] }
	});
	dataTableStore.subscribe((model) => dataTableHandler(model));

	// Manual Selection
	dataTableStore.select('id', [1]);

	function triggerConfirm(indx) {
		const confirm = {
			type: 'confirm',
			title: 'Please Confirm',
			body: `
                Are you sure you wish to proceed?
                The selected title is:
                ${indx.title}`,
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: (r) => console.log('response:', r),
			// Optionally override the button text
			buttonTextCancel: 'Cancel',
			buttonTextConfirm: 'Confirm'
		};
		modalStore.trigger(confirm);
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
                        <th><input type="checkbox" on:click={(e) => { dataTableStore.selectAll(e.currentTarget.checked) }} /></th>
                        <th data-sort="id">ID</th>
                        <th>User</th>
                        <th data-sort="title">Title</th>
                        <th data-sort="body">Body</th>
                        <th class="table-cell-fit"></th>
                    </tr>
                </thead>
                <tbody>
                    {#each $dataTableStore.filtered as row, rowIndex}
                        <tr class:table-row-checked={row.dataTableChecked} aria-rowindex={rowIndex + 1}>
                            <td role="gridcell" aria-colindex={1} tabindex="0">
                                <input type="checkbox" bind:checked={row.dataTableChecked} />
                            </td>
                            <td role="gridcell" aria-colindex={2} tabindex="0">
                                <em class="opacity-50">{row.id}</em>
                            </td>
                            <td role="gridcell" aria-colindex={3} tabindex="0">
                                <Avatar src={`https://i.pravatar.cc/?img=${row.id}`} width="w-8" />
                            </td>
                            <td role="gridcell" aria-colindex={4} tabindex="0" class="md:!whitespace-normal capitalize">
                                {row.title}
                            </td>
                            <td role="gridcell" aria-colindex={5} tabindex="0" class="md:!whitespace-normal">
                                {row.body}
                            </td>
                            <td role="gridcell" aria-colindex={6} tabindex="0" class="table-cell-fit">
                                <button class="btn btn-ghost-surface btn-sm" on:click={()=>{triggerConfirm(row,rowIndex)}}>Console Log</button>
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

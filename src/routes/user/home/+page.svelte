<script>
	import { Paginator, Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import Temporizador from '../../../lib/components/temporizador/Temporizador.svelte';

	const sourceHeaders = ['Fecha y hora', 'Cantidad', 'Estado'];
	const sourceBody = [
		['2021/09/03 02:10:59 PM', '$ 5000', 'Pendiente...'],
		['2021/09/03 02:10:59 PM', '$ 5000', 'Aceptado'],
		['2021/09/03 02:10:59 PM', '$ 5000', 'Aceptado'],
		['2021/09/03 02:10:59 PM', '$ 5000', 'Rechazado'],
		['2021/09/03 02:10:59 PM', '$ 5000', 'Aceptado']
	];

	// Reactive
	let page = {
		offset: 0,
		limit: 5,
		size: sourceBody.length,
		amounts: [1, 2, 5, sourceBody.length]
	};

	// Reactive
	$: sourceBodySliced = sourceBody.slice(
		page.offset * page.limit,
		page.offset * page.limit + page.limit
	);
</script>

<div class="h-1/3 flex justify-center items-center">
	<div
		class="w-1/2 mx-8 p-10 border-solid border-2 border-black text-center bg-blue-400 bg-opacity-25"
	>
		<p class="unstyled text-3xl">Cupo disponible</p>
		<p class="unstyled text-5xl">$ 300</p>
	</div>
	<div
		class="w-1/2 mx-8 p-10 border-solid border-2 border-black text-center bg-blue-400 bg-opacity-25"
	>
		<p class="unstyled text-3xl">Pagar antes de...</p>
		<Temporizador resultado="No hay ningun cupo" />
	</div>
</div>

<div class="mx-8">
	<Table
		source={{ head: sourceHeaders, body: sourceBodySliced }}
		class="border-solid border-2 border-black mb-4"
	/>
	<Paginator bind:settings={page} />
</div>

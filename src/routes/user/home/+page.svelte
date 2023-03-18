<script>
	import { Paginator, Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Temporizador from '../../../lib/components/temporizador/Temporizador.svelte';

	export let data;
	const solicitations = data.solicitations;

	const sourceHeaders = [
		'Fecha de solicitud',
		'Cantidad',
		'Días a pagar',
		'Estado',
		'Razon de rechazo'
	];
	const sourceBody = [];

	for (const solicitation of solicitations) {
		sourceBody.push([
			solicitation.applicated_at,
			solicitation.amount,
			solicitation.paymentDays,
			solicitation.state.name,
			solicitation.rejection_reason ?? 'Ninguno'
		]);
	}

	const lastPayDay = new Date(solicitations.at(-1).applicated_at).setDate(
		new Date(solicitations.at(-1).applicated_at).getDate() + solicitations.at(-1).paymentDays
	);

	const lastAmount = solicitations.at(-1).amount;

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

<div class="w-full lg:flex items-center text-center">
	<div
		class="lg:w-1/2 w-auto m-8 p-10 border-solid border-2 border-black bg-blue-400 bg-opacity-25"
	>
		<p class="unstyled text-3xl">Cupo disponible</p>
		<p class="unstyled text-5xl">$ {lastAmount}</p>
	</div>
	<div
		class="lg:w-1/2 w-auto m-8 p-10 border-solid border-2 border-black bg-blue-400 bg-opacity-25"
	>
		<p class="unstyled text-3xl">Pagar antes de...</p>
		<Temporizador resultado="No hay ningun cupo" lastDay={lastPayDay} />
	</div>
</div>

<div class="m-8">
	<Table
		source={{ head: sourceHeaders, body: sourceBodySliced }}
		class="border-solid border-2 border-black mb-4"
	/>
	<Paginator bind:settings={page} />
</div>

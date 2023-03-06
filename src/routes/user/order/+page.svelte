<script>
	import { ProgressRadial, RadioGroup, RadioItem, RangeSlider } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';

	let daysToAdd = writable(0);
	let value = 0;
	$: interest = (2.5 * value) / 100;
	let insurance = 7;
	let maintenance = 11;
	$: total = interest + insurance + maintenance;

	const currentDate = new Date();
	$: futureDate = new Date(currentDate.getTime() + $daysToAdd * 24 * 60 * 60 * 1000);
	const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
	$: formattedDate = futureDate.toLocaleDateString('es-CO', options);
</script>

<div
	class="mx-auto h-full w-1/2 container text-center flex justify-center items-center border-solid border-8 border-black border-indigo-500/40 !bg-secondary-500/5"
>
	<form action="">
		<div class="w-full my-8">
			<label for="" class="text-2xl">1. ¿Cúanto dinero necesitas?</label>
			<ProgressRadial class="w-1/2 mx-auto my-6" value={1000}>$ {value}</ProgressRadial>
			<div class="flex mx-auto">
				<span>min</span>
				<RangeSlider class="w-full mx-4" max={1000} step={50} bind:value />
				<span>max</span>
			</div>
		</div>
		<div class="w-full my-8">
			<label for="" class="text-2xl">2. ¿Cuándo lo pagarás?</label>
			<RadioGroup selected={daysToAdd} class="w-full mx-auto my-4" display="flex">
				{#if value >= 0 && value <= 400}
					<RadioItem value={5}>5 días</RadioItem>
					<RadioItem value={15}>15 días</RadioItem>
					<RadioItem value={30}>30 días</RadioItem>
				{/if}
				{#if value >= 401 && value <= 800}
					<RadioItem value={45}>45 días</RadioItem>
					<RadioItem value={60}>60 días</RadioItem>
				{/if}
				{#if value >= 801 && value <= 1000}
					<RadioItem value={90}>90 días</RadioItem>
				{/if}
			</RadioGroup>
		</div>
		<!-- TODO: Cambiarlo por el <Divider> de skeleton -->
		<hr class="w-full" />
		<div class="my-6">
			<!-- TODO: generar valores dinamicos -->
			<table class="text-left w-full mx-auto">
				<tbody>
					<tr>
						<td>Interés Corriente (2,5%):</td>
						<td class="text-right">${interest}</td>
					</tr>
					<tr>
						<td>Seguro de vida deudor:</td>
						<td class="text-right">${insurance}</td>
					</tr>
					<tr>
						<td>Costos plataforma tecnológica:</td>
						<td class="text-right">${maintenance}</td>
					</tr>
					<tr>
						<td>Total:</td>
						<td class="text-right">${total}</td>
					</tr>
					<tr>
						<td>Fecha de pago:</td>
						<td class="text-right">{formattedDate}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="w-full">
			<!-- TODO: encapsular el boton en un formulario -->
			<button type="submit" class="w-full btn btn-filled-secondary btn-base"
				>Solicita tu crédito</button
			>
		</div>
	</form>
</div>

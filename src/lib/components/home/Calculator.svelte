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

<section class="container mx-auto h-1/2 flex">
	<div class="w-1/2 bg-image">
		<div class="stick">
			<h1 class="text-6xl">
				<span class="text-[green]">El dinero esta</span>
				<br />más cerca
				<br />de lo que crees
			</h1>
			<div class="grid gap-6 mt-9">
				<div class="flex items-center">
					<img class="w-10" src="src/lib/img/icons/clock.svg" alt="clock icon" />
					<p class="ml-4">Fácil de obtener crédito, fácil de pagar</p>
				</div>
				<div class="flex items-center">
					<img class="w-10" src="src/lib/img/icons/card.svg" alt="clock icon" />
					<p class="ml-4">Transferencia instantánea a cualquier tarjeta Visa/MasterCard</p>
				</div>
				<div class="flex items-center">
					<img class="w-10" src="src/lib/img/icons/laptop.svg" alt="clock icon" />
					<p class="ml-4">100% online, sin moverte de casa</p>
				</div>
				<div class="flex items-center">
					<img class="w-10" src="src/lib/img/icons/money.svg" alt="clock icon" />
					<p class="ml-4">Cobro de crédito en la tarjeta, en la cuenta o en efectivo</p>
				</div>
			</div>
		</div>
	</div>
	<div class="w-1/2">
		<div class="w-full flex bg-orange-700 p-4">
			<div class="w-1/2 flex items-center">
				<img
					class="w-5 fill-white"
					src="src/lib/img/icons/availability.svg"
					alt="availability icon"
				/>
				<p class="text-2xs font-light ml-4">
					24 horas al día, 7 días a la semana, incluidos fines de semana y festivos
				</p>
			</div>
			<div class="w-1/2 flex items-center ml-1">
				<img class="w-4 fill-white" src="src/lib/img/icons/consent.svg" alt="consent icon" />
				<p class="text-2xs font-light ml-4">
					Aprobación en 2 minutos, transferencia de dinero instantánea
				</p>
			</div>
		</div>
		<div class="w-full p-10">
			<div class="flex flex-col m-auto">
				<!-- TODO: cambiar el titulo a un <p></p>  -->
				<h3 class="text-center my-6">1. ¿Cúanto dinero necesitas?</h3>
				<ProgressRadial class="w-1/4 mx-auto my-6" value={1000}>$ {value}</ProgressRadial>
				<div class="flex mx-auto">
					<span>min</span>
					<RangeSlider class="w-full mx-4" max={1000} step={50} bind:value />
					<span>max</span>
				</div>
				<!-- <RoundRangeSlider bind:value max="1000" step="50" label="$" textPosition="before" /> -->
			</div>
			<div>
				<!-- TODO: cambiar el titulo a un <p></p>  -->
				<h3 class="text-center my-6">2. ¿Cuándo lo pagarás?</h3>
				<RadioGroup selected={daysToAdd} class="w-1/2 mx-auto" display="flex">
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
		</div>
		<!-- TODO: Cambiarlo por el <Divider> de skeleton -->
		<hr class="w-3/4 mx-auto" />
		<div class="my-6">
			<!-- TODO: generar valores dinamicos -->
			<table class="w-1/2 mx-auto">
				<tbody>
					<tr>
						<td>Interés Corriente (2,5%):</td>
						<td>${interest}</td>
					</tr>
					<tr>
						<td>Seguro de vida deudor:</td>
						<td>${insurance}</td>
					</tr>
					<tr>
						<td>Costos plataforma tecnológica:</td>
						<td>${maintenance}</td>
					</tr>
					<tr>
						<td>Total:</td>
						<td>${total}</td>
					</tr>
					<tr>
						<td>Fecha de pago:</td>
						<td>{formattedDate}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="w-1/4 mx-auto">
			<!-- TODO: encapsular el boton en un formulario -->
			<button type="submit" class="btn btn-filled-secondary btn-base">Solicita tu crédito</button>
		</div>
	</div>
</section>

<style>
	@media (min-width: 768px) and (min-height: 768px) {
		.bg-image {
			background: url('src/lib/img/girl.png') no-repeat;
			background-size: contain;
		}
	}

	.stick {
		left: 10%;
		position: relative;
		top: 25%;
	}

	.text-2xs {
		font-size: 12px;
	}
</style>

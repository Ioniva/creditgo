<script>
	import { modalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent;
	export let uuid;

	const submitSolicitation = () => {
		const url = 'http://localhost:4000/api/v1/solicitation';
		const data = {
			uuid: uuid,
			state: 'A'
		};
		FetchUtil.post(url, data);
	};

	function handleConfirmation() {
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

<div class="modal-example-form h-full space-y-4">
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
			<p class="unstyled text-2xl border-b-2 border-blue-700">Datos adicionales</p>
			<div class="mt-2 flex flex-wrap gap-4">
				<p class="flex-[3_0_auto%]">
					<span class="font-bold">Ingreso neto mensual: </span>
					{parent.netMonthlyIncome}
				</p>
				<p class="flex-[3_0_auto%]">
					<span class="font-bold">Ingresos adicionales: </span>
					{parent.additionalIncome}
				</p>
				<p class="flex-[1_0_auto%]">
					<span class="font-bold">Tipo de empleado: </span>
					{parent.employeeType}
				</p>
			</div>
		</div>
	</div>
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn btn-ghost-surface btn-sm" on:click={parent.onClose}>Volver</button>
		<button class="btn btn-ghost-surface btn-sm bg-green-800" on:click={handleConfirmation}
			>Confirmar prestamo</button
		>
	</footer>
</div>

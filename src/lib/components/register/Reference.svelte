<script>
	import Input from '../ui-library/Input/Input.svelte';
	import Select from '../ui-library/Select/Select.svelte';
	import SelectItem from '../ui-library/Select/SelectItem.svelte';

	export let errors;
</script>

<section>
	<div class="grid grid-cols-2 gap-x-6">
		<div class="mb-6 w-full">
			<!-- cedula -->
			<Input
				type="text"
				id="cedula"
				label="Cédula*"
				placeholder="Inserte aquí su cédula*"
				errors={errors?.cedula}
			/>
		</div>
		<div class="mb-6 w-full">
			<!-- phone number -->
			<Input
				type="tel"
				id="phone"
				label="Teléfono*"
				errors={errors?.phone}
				placeholder="Inserte aquí su número del teléfono*"
			/>
		</div>
		<div class="mb-6 w-full">
			<!-- name -->
			<Input
				type="text"
				id="name"
				label="Nombre*"
				placeholder="Inserte aquí su nombre*"
				errors={errors?.name}
			/>
		</div>
		<div class="mb-6 w-full">
			<!-- surname -->
			<Input
				type="text"
				id="surname"
				label="Apellidos*"
				placeholder="Inserte aquí sus apellidos*"
				errors={errors?.surname}
			/>
		</div>
		<div class="mb-6 w-full">
			<!-- cedula dispatch date -->
			<Input
				type="date"
				id="dispatchDate"
				label="Fecha de expedición de la cédula*"
				errors={errors?.dispatchDate}
			/>
		</div>
		<div class="mb-6 w-full">
			<!-- cedula dispatch date -->
			<Input
				type="text"
				id="dispatchPlace"
				label="Lugar de expedición de la cédula*"
				placeholder="Inserte aquí el lugar de expedición*"
				errors={errors?.dispatchPlace}
			/>
		</div>
		<div class="mb-6 w-full">
			<!-- department -->
			<Input
				type="text"
				id="department"
				placeholder="Inserte aquí la dirección de su departamento*"
				label="Dirección del departamento*"
				errors={errors?.department}
			/>
		</div>

		<div class="mb-6 w-full">
			<!-- city -->
			<Input
				type="text"
				id="city"
				placeholder="Inserte aquí el nombre de su ciudad*"
				label="Ciudad*"
				errors={errors?.city}
			/>
		</div>
		<div class="mb-6 w-full">
			<!-- zip -->
			<Input
				type="text"
				id="zip"
				placeholder="Inserte aquí el zip de su ciudad*"
				label="ZIP*"
				errors={errors?.zip}
			/>
		</div>
		<div class="mb-6 w-full group">
			<!-- employee type -->
			<label for="employeeType">
				<span>Tipo de trabajador</span>
				<!-- TODO: Añadir el label dentro del componente -->
				<!-- TODO: Añadir el name dentro del componente y que tenga el mismo valor que el id -->
				<Select id="employeeType" name="employeeType">
					<!-- TODO: Guardar en minusculas en la base de datos -->
					<SelectItem>Tipo de trabajador</SelectItem>
					<SelectItem value="E">Empleado</SelectItem>
					<SelectItem value="I">Independiente</SelectItem>
					<SelectItem value="P">Pensionado</SelectItem>
					<SelectItem value="D">Desempleado</SelectItem>
					<SelectItem value="R">Prestador de servicios</SelectItem>
				</Select>
				<!-- TODO: Añadir el label de error en el componente -->
				{#if errors?.employeeType}
					<p class="unstyled text-red-500 py-0 pt-1">
						{errors?.employeeType}
					</p>
				{/if}
			</label>
		</div>
	</div>
</section>

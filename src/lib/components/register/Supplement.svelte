<script>
	import Select from '../ui-library/Select/Select.svelte';
	import SelectItem from '../ui-library/Select/SelectItem.svelte';

	import banks from '../../content/banks.js';
	import Input from '../ui-library/Input/Input.svelte';

	export let errors;
</script>

<section>
	<div class="grid grid-cols-2 gap-x-6">
		<div class="mb-6 w-full group">
			<!-- bank name -->
			<label for="bankName">
				<span>Tu banco*</span>
				<!-- TODO: Añadir el label dentro del componente -->
				<!-- TODO: Añadir el name dentro del componente y que tenga el mismo valor que el id -->
				<Select id="bankName" name="bankName">
					<!-- TODO: Guardar en minusculas y con _ en la base de datos -->
					<!-- TODO: Cambiar los espacios por _ -->
					{#each banks as bank}
						<SelectItem>Selecciona tu banco...</SelectItem>
						<SelectItem value={bank}>{bank}</SelectItem>
					{/each}
				</Select>
				<!-- TODO: Añadir el label de error en el componente -->
				{#if errors?.bankName}
					<p for="bankName" class="unstyled text-red-500 py-0 pt-1">
						{errors?.bankName}
					</p>
				{/if}
			</label>
		</div>
		<div class="mb-6 w-full group">
			<!-- bank type -->
			<label for="bankType">
				<span>Tipo de cuenta*</span>
				<!-- TODO: Añadir el label dentro del componente -->
				<!-- TODO: Añadir el name dentro del componente y que tenga el mismo valor que el id -->
				<Select id="bankType" name="bankType">
					<!-- TODO: Guardar en minusculas en la base de datos -->
					<SelectItem>Tipo de cuenta</SelectItem>
					<SelectItem value="A">Ahorro</SelectItem>
					<SelectItem value="C">Corriente</SelectItem>
				</Select>
				<!-- TODO: Añadir el label de error en el componente -->
				{#if errors?.bankType}
					<p class="unstyled text-red-500 py-0 pt-1">
						{errors?.bankType}
					</p>
				{/if}
			</label>
		</div>
		<div class="mb-6 w-full group">
			<!-- bank holder name -->
			<Input
				type="text"
				id="bankHolder"
				label="Titular de la cuenta*"
				placeholder="Inserte aquí el nombre del titular*"
				errors={errors?.bankHolder}
			/>
		</div>
		<div class="mb-6 w-full group">
			<!-- bank number -->
			<Input
				type="text"
				id="bankNumber"
				label="Número de la cuenta (sin guiones o rayas)"
				placeholder="Inserte aquí el número de la cuenta"
				errors={errors?.bankNumber}
			/>
		</div>
	</div>
</section>

<section>
	<!-- title -->
	<p class="my-6 p-4 bg-blue-500 unstyled text-xl font-bold">Información laboral</p>
	<div class="grid grid-cols-2 gap-x-6">
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

<section>
	<!-- title -->
	<p class="my-6 p-4 bg-blue-500 unstyled text-xl font-bold">
		Cuentanos sobre tus ingresos - egresos - pasivos
	</p>
	<div class="grid grid-cols-2 gap-x-6">
		<div class="mb-6 w-full group">
			<Input
				type="text"
				id="netMonthlyIncome"
				label="Ingresos netos mensuales*"
				placeholder="Inserte aquí su ingreso neto mensual*"
				errors={errors?.netMonthlyIncome}
			/>
		</div>
		<div class="mb-6 w-full group">
			<Input
				type="text"
				id="netMonthlyExpense"
				label="Gastos netos mensuales"
				placeholder="Inserte aquí su gasto neto mensual"
				errors={errors?.netMonthlyExpense}
			/>
		</div>
		<div class="mb-6 w-full group">
			<Input
				type="text"
				id="additionalIncome"
				label="Ingresos netos adicionales"
				placeholder="Inserte aquí sus ingresos adicionales (el neto)"
				errors={errors?.additionalIncome}
			/>
		</div>
	</div>
</section>

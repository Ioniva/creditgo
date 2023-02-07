<script>
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	import Input from '../ui-library/Input/Input.svelte';
	import Select from '../ui-library/Select/Select.svelte';
	import SelectItem from '../ui-library/Select/SelectItem.svelte';

	// Props
	export let errors;

	const storeGenre = writable();
</script>

<small>* Campos obligatorios</small>
<section>
	<!-- user basic data wrapper -->
	<div class="grid grid-cols-2 gap-x-6">
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
			<!-- birthdate -->
			<Input type="date" id="birthDate" label="Fecha de nacimiento*" errors={errors?.birthDate} />
		</div>
		<div class="mb-6 w-full">
			<!-- genre -->
			<label for="gender">
				<span class="mr-3">Genero*</span>
				<input type="hidden" name="genre" value={$storeGenre} />
				<RadioGroup selected={storeGenre} label="Genero">
					<RadioItem label="female" value="female">Femenino</RadioItem>
					<RadioItem label="male" value="male">Másculino</RadioItem>
					<RadioItem label="other" value="other">Otro</RadioItem>
				</RadioGroup>
			</label>

			<!-- error -->
			{#if errors?.gender}
				<label for="gender" class="text-red-500 py-0 pt-1">
					{errors?.gender}
				</label>
			{/if}
		</div>
		<div class="mb-6 w-full">
			<!-- marital status -->
			<!-- TODO: Crear un JSON con las opciones -->
			<!-- TODO: Crear una tabla con los valores (osea documentarlo) -->
			<label for="maritalStatus">
				<span class="mr-3">Estado civil</span>

				<Select id="maritalStatus" name="maritalStatus">
					<SelectItem value="S">Soltero/a</SelectItem>
					<SelectItem value="U">Unión Libre</SelectItem>
					<SelectItem value="C">Casado/a</SelectItem>
					<SelectItem value="D">Divorciado/a</SelectItem>
					<SelectItem value="V">Viudo/a</SelectItem>
				</Select>
			</label>
			<!-- error -->
			{#if errors?.maritalStatus}
				<label for="maritalStatus" class="text-red-500 py-0 pt-1">
					{errors?.maritalStatus}
				</label>
			{/if}
		</div>
		<div class="mb-6 w-full">
			<!-- children -->
			<Input
				type="number"
				id="children"
				label="Cantidad de hijos"
				placeholder="Inserte aquí la cantidad de hijos"
				min="0"
				max="6"
				errors={errors?.children}
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
	</div>
</section>

<section>
	<!-- title -->
	<p class="my-6 p-4 bg-blue-500 unstyled text-xl font-bold">Información demográfica</p>

	<div class="grid grid-cols-2 gap-x-6">
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
	</div>
</section>

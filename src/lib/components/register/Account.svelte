<script>
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import Input from '../ui-library/Input/Input.svelte';

	// Props
	export let errors;

	// Base classes
	const cTextGreen = 'text-green-600';
	const cTextRed = 'text-red-600';

	// State
	let password = '';
	let repeatPassword = '';
	let passwordStrength = 0;
	let email = '';
	let repeatEmail = '';

	// Password regex
	const min9CharsRegex = /^.{9,}$/;
	const upperCaseRegex = /^(?=.*[A-Z])./;
	const lowerCaseRegex = /^(?=.*[a-z])./;
	const numberRegex = /^(?=.*\d)./;
	const specialCharRegex = /^(?=.*[-+*?¿@|#€])./;

	// Computed properties
	$: isMinLength = min9CharsRegex.test(password) ? cTextGreen : cTextRed;
	$: hasUpperCase = upperCaseRegex.test(password) ? cTextGreen : cTextRed;
	$: hasLowerCase = lowerCaseRegex.test(password) ? cTextGreen : cTextRed;
	$: hasNumber = numberRegex.test(password) ? cTextGreen : cTextRed;
	$: hasSpecial = specialCharRegex.test(password) ? cTextGreen : cTextRed;

	// check password strength
	$: {
		let score = 0;
		if (min9CharsRegex.test(password)) score++;
		if (upperCaseRegex.test(password)) score++;
		if (lowerCaseRegex.test(password)) score++;
		if (numberRegex.test(password)) score++;
		if (specialCharRegex.test(password)) score++;
		passwordStrength = (score / 5) * 100;
	}
</script>

<small>* Campos obligatorios</small>

<section>
	<!-- cedula -->
	<div class="grid grid-cols-2 gap-6 mt-4">
		<Input
			type="text"
			id="cedula"
			label="Cédula*"
			placeholder="Inserte aquí su cédula*"
			errors={errors?.cedula}
		/>
	</div>

	<!-- password wrapper -->
	<div>
		<!-- input wrapper -->
		<div class="flex gap-6">
			<!-- password -->
			<Input
				type="password"
				id="password"
				label="Contraseña*"
				placeholder="Inserte aquí su contraseña*"
				errors={errors?.password}
				bind:value={password}
			/>
			<!-- repeat password-->
			<Input
				type="password"
				id="repeatPassword"
				label="Repetir contraseña*"
				placeholder="Vuelve a insertar su contraseña*"
				errors={errors?.repeatPassword}
				bind:value={repeatPassword}
			/>
		</div>

		<!-- password strength -->
		<ProgressBar label="Robustez de la contraseña" value={passwordStrength} max={100} />

		<!-- password requirements -->
		<div class="my-6">
			<ul>
				<li class={isMinLength}>- Mínimo 9 carácteres</li>
				<li class={hasUpperCase}>- Mínimo una letra mayúscula</li>
				<li class={hasLowerCase}>- Mínimo una letra minúscula</li>
				<li class={hasNumber}>- Mínimo un número</li>
				<li class={hasSpecial}>- Al menos un carácter especial (-+*?¿)</li>
			</ul>
		</div>
	</div>

	<!-- email wrapper -->

	<div class="grid grid-cols-2 gap-x-6">
		<!-- email -->
		<Input
			type="email"
			id="email"
			label="Email*"
			errors={errors?.email}
			placeholder="Inserte aquí su correo electrónico*"
		/>
		<!-- repeat email -->
		<Input
			type="email"
			id="repeatEmail"
			label="Repetir email*"
			placeholder="Vuelve a insertar su correo electrónico*"
		/>
	</div>
</section>

<section>
	<!-- basic data title -->
	<p class="unstyled my-6 p-4 bg-blue-500 text-xl font-bold">Datos básicos</p>

	<!-- phone number wrapper -->
	<div class="grid grid-cols-2 gap-x-6">
		<!-- phone number -->
		<Input
			type="tel"
			id="phone"
			label="Teléfono*"
			errors={errors?.phone}
			placeholder="Inserte aquí su número del teléfono*"
		/>
		<!-- repeat phone number -->
		<Input
			type="tel"
			id="repeatPhone"
			label="Repetir teléfono*"
			placeholder="Vuelve a insertar su número del teléfono*"
		/>
	</div>

	<!-- reference wrapper -->
	<div>
		<p class="text-base italic mb-4">¿Dónde nos conociste?</p>
		<div class="flex flex-row">
			<Input type="radio" id="meetPlace" value="facebook" label="Facebook" flex />
			<Input type="radio" id="meetPlace" value="google" label="Google" flex />
			<Input type="radio" id="meetPlace" value="referidos" label="Referidos" flex />
			<Input type="radio" id="meetPlace" value="otros" label="Otros" flex />
		</div>
		<!-- error -->
		{#if errors?.meetplace}
			<label for="meetplace" class="text-red-500 py-0 pt-1">
				{errors?.meetplace}
			</label>
		{/if}
	</div>
</section>

<section>
	<!-- basic data title -->
	<p class="unstyled my-6 p-4 bg-blue-500  text-xl font-bold">Acuerdos</p>
	<div>
		<!-- conditions license -->
		<div>
			<!-- title -->
			<p class="font-semibold text-lg">Términos y condiciones</p>

			<!-- link 1 -->
			<a
				href="https://webkapital.com.co/terminos-y-condiciones-gu/"
				target="_blank"
				rel="noreferrer">Clic aquí para ver Términos y Condiciones Generales de Uso</a
			>
			<br />

			<!-- link 2 -->
			<a href="https://webkapital.com.co/politicas-de-credito/" target="_blank" rel="noreferrer"
				>Clic aquí para ver Políticas de Crédito</a
			>
			<br />

			<!-- link 3 -->
			<a href="https://webkapital.com.co/politicas-de-pqr/" target="_blank" rel="noreferrer"
				>Clic aquí para ver Políticas de PQRS</a
			>
			<br />

			<!-- condition checkbox -->
			<Input
				type="checkbox"
				id="termCondition"
				label="He leído y aceptado los Términos y Condiciones de CreditGo"
				errors={errors?.termCondition}
				flex
			/>
		</div>

		<!-- authorization license -->
		<div class="my-8">
			<!-- title -->
			<p class="font-semibold text-lg">Autorización Datos Personales</p>

			<!-- link 1 -->
			<a
				href="https://webkapital.com.co/autorizacion-datos-personales/"
				target="_blank"
				rel="noreferrer">Clic aquí para ver Autorización Datos Personales</a
			><br />

			<!-- link 2 -->
			<a href="https://webkapital.com.co/politicas-de-privacidad/" target="_blank" rel="noreferrer"
				>Clic aquí para ver Politica de tratamiento de Datos Personales</a
			><br />

			<!-- link 3 -->
			<a href="https://webkapital.com.co/aviso-de-privacidad-2/" target="_blank" rel="noreferrer"
				>Clic aquí para ver Aviso de Privacidad</a
			>

			<!-- condition checkbox -->
			<Input
				type="checkbox"
				id="personalInfo"
				label="He leído y aceptado la Autorización Datos Personales de CreditGo"
				errors={errors?.personalInfo}
				flex
			/>
		</div>
	</div>
</section>

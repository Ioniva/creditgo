<script>
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import Input from '../../ui-library/Input/Input.svelte';
	export let form;
</script>

<small>* Campos obligatorios</small>
<form action="?/account" method="POST" class="w-1/2">
	<!-- Cedula -->
	<div class="grid md:grid-cols-2 md:gap-6">
		<div class="mb-6 w-full group">
			<label>
				<span class="text-base font-bold">Cédula*</span>
				<input type="text" placeholder="Cédula*" />
			</label>
		</div>
	</div>
	<!-- /Cedula -->

	<!-- Contraseña -->
	<div class="grid md:grid-cols-2 md:gap-x-6">
		<div class="mb-6 w-full group">
			<Input
				type="password"
				id="password"
				label="Password"
				value={form?.data?.password}
				errors={form?.errors?.password}
			/>
		</div>
		<div class="mb-6 w-full group">
			<Input
				type="password"
				id="confirmPassword"
				label="Confirm Password"
				value={form?.data?.password}
				errors={form?.errors?.password}
			/>
		</div>
	</div>
	<!-- /Contraseña -->

	<!-- Robustez de la contraseña -->
	<div class="w-1/2">
		<ProgressBar label="Password Strength" value={50} max={100} />
		<div class="my-6">
			<ul class="text-red-600">
				<li>- Mínimo 9 carácteres</li>
				<li>- Mínimo una letra mayúscula</li>
				<li>- Mínimo una letra minúscula</li>
				<li>- Mínimo un número</li>
				<li>- Al menos un carácter especial (-+*?¿)</li>
				<li>- Confirmar contraseña</li>
			</ul>
		</div>
	</div>
	<!-- /Robustez de la contraseña -->

	<!-- Correo -->
	<div class="grid md:grid-cols-2 md:gap-x-6">
		<div class="mb-6 w-full group">
			<Input
				type="email"
				id="email"
				label="Email"
				value={form?.data?.email}
				errors={form?.errors?.email}
				placeholder="Correo*"
			/>
		</div>
		<div class="mb-6 w-full group">
			<label>
				<span class="text-base font-bold">Confirmar correo*</span>
				<input type="email" placeholder="Confirmar correo*" />
			</label>
		</div>
	</div>
	<!-- /Correo -->

	<!-- Titulo -->
	<p class="my-6 p-4 bg-blue-500 unstyled text-xl font-bold">Datos básicos</p>
	<!-- /Titulo -->

	<!-- Nombres -->
	<div class="grid md:grid-cols-2 md:gap-x-6">
		<div class="mb-6 w-full group">
			<label>
				<span class="text-base font-bold">Celular*</span>
				<input type="tel" placeholder="Celular*" />
			</label>
		</div>
		<div class="mb-6 w-full group">
			<label>
				<span class="text-base font-bold">Confirmar celular*</span>
				<input type="tel" placeholder="Confirmar celular*" />
			</label>
		</div>
	</div>
	<!-- /Nombres -->

	<!-- Reference -->
	<p class="text-base italic mb-4">¿Dónde nos conociste?</p>
	<div class="flex flex-wrap gap-6">
		<div class="flex">
			<input class="mr-3" type="checkbox" id="facebook" />
			<label for="facebook">Facebook</label>
		</div>

		<div class="flex">
			<input class="mr-3" type="checkbox" id="google" />
			<label for="google">Google</label>
		</div>

		<div class="flex">
			<input class="mr-3" type="checkbox" id="referidos" />
			<label for="referidos">Referidos</label>
		</div>

		<div class="flex">
			<input class="mr-3" type="checkbox" id="otros" />
			<label class="flex" for="otros">Otros</label>
		</div>
	</div>
	<!-- /Reference -->

	<!-- Titulo -->
	<p class="my-6 p-4 bg-blue-500 unstyled text-xl font-bold">Acuerdos</p>
	<!-- /Titulo -->

	<!-- Conditions license -->
	<div>
		<p class="font-semibold text-lg">Términos y condiciones</p>
		<a href="https://webkapital.com.co/terminos-y-condiciones-gu/"
			>Clic aquí para ver Términos y Condiciones Generales de Uso</a
		><br />
		<a href="https://webkapital.com.co/politicas-de-credito/"
			>Clic aquí para ver Políticas de Crédito</a
		><br />
		<a href="https://webkapital.com.co/politicas-de-pqr/">Clic aquí para ver Políticas de PQRS</a>
		<label class="flex">
			<input type="checkbox" />
			<span class="ml-4">He leído y aceptado los Términos y Condiciones de CredGo</span>
		</label>
	</div>
	<!-- /Conditions license -->

	<!-- Authorization license -->
	<div class="my-8">
		<p class="font-semibold text-lg">Autorización Datos Personales</p>
		<a href="https://webkapital.com.co/autorizacion-datos-personales/"
			>Clic aquí para ver Autorización Datos Personales</a
		><br />
		<a href="https://webkapital.com.co/politicas-de-privacidad/"
			>Clic aquí para ver Politica de tratamiento de Datos Personales</a
		><br />
		<a href="https://webkapital.com.co/aviso-de-privacidad-2/"
			>Clic aquí para ver Aviso de Privacidad</a
		>
		<label class="flex">
			<input type="checkbox" />
			<span class="ml-4">He leído y aceptado la Autorización Datos Personales de CredGo</span>
		</label>
	</div>
	<!-- /Authorization license -->
</form>

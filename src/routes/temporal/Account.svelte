<script>
	import Input from '../../lib/components/ui-library/Input/Input.svelte';

	export let errors;
</script>

<h2>Form 1</h2>
<Input
	type="email"
	id="email"
	label="Email"
	placeholder="Introduce tu dirección de correo*"
	errors={errors?.email}
/>
<Input
	type="password"
	id="password"
	label="Password"
	placeholder="Introduce tu contraseña*"
	errors={errors?.password}
/>

<script>
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar, Toast } from '@skeletonlabs/skeleton';
	import { Modal } from '@skeletonlabs/skeleton';
	import Dropdown from '../lib/components/ui-library/dropdown/Dropdown.svelte';
	import DropdownItem from '../lib/components/ui-library/dropdown/DropdownItem.svelte';
	import DropdownFormItem from '../lib/components/ui-library/dropdown/DropdownFormItem.svelte';
	export let data;
</script>

<Modal regionBackdrop="bg-surface-backdrop-token backdrop-blur-sm" />
<Toast />

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="header">
		<!-- Contact -->
		<section class="h-8 flex justify-center gap-4">
			<p class="unstyled text-base text-blue-200 mr-8">Contáctanos:</p>
			<p class="unstyled text-base text-blue-200">+13 311 123 123</p>
			<p class="unstyled text-base text-blue-200">PBX (701)2141123</p>
		</section>

		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<img class="h-12 w-50" src="/src/lib/img/logo.png" alt="credgo logo" />
				<div>
					{#if !data.isAuthenticated}
						<a class="btn btn-base" href="/">Inicio</a>
						<a class="btn btn-base" href="/faq">Preguntas frecuentes</a>
						<a class="btn btn-base" href="/interest-rates">Tasas de interes</a>
						<a class="btn btn-base" href="/progress">Progresión</a>
					{/if}
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if !data.isAuthenticated}
					<a class="btn btn-base btn-filled-primary" href="/register">Registrate</a>
					<a class="btn btn-base btn-ringed-primary" href="/login">Ingresa</a>
				{/if}
				{#if data.isAuthenticated}
					<Dropdown title={data.user.email}>
						<DropdownItem href="/profile">Perfil</DropdownItem>
						<DropdownFormItem action="/logout" method="POST">Logout</DropdownFormItem>
					</Dropdown>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

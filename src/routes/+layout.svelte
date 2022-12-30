<script>
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
                <img class="h-12 w-50" src="src/lib/img/logo.png" alt="credgo logo">
                <div>
                    <a class="btn btn-base" href="/">Inicio</a>
                    <a class="btn btn-base" href="/faq">Preguntas frecuentes</a>
                    <a class="btn btn-base" href="/interest-rates">Tasas de interes</a>
                    <a class="btn btn-base" href="/">Progresión</a>
                </div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
                <a class="btn btn-base btn-filled-primary" href="/">Registrate</a>
				<a class="btn btn-base btn-ringed-primary" href="/">Ingresa</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

<script>
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { Modal } from '@skeletonlabs/skeleton';
</script>

<Modal  regionBackdrop="bg-surface-backdrop-token backdrop-blur-sm"/>


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
                <img class="h-12 w-50" src="src/lib/img/logo.png" alt="credgo logo">
                <div>
                    <a class="btn btn-base" href="/">Inicio</a>
                    <a class="btn btn-base" href="/faq">Preguntas frecuentes</a>
                    <a class="btn btn-base" href="/interest-rates">Tasas de interes</a>
                    <a class="btn btn-base" href="/">Progresión</a>
                </div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
                <a class="btn btn-base btn-filled-primary" href="/register">Registrate</a>
				<a class="btn btn-base btn-ringed-primary" href="/login">Ingresa</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

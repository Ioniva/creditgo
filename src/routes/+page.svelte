<script>
	import Footer from '../lib/components/Footer.svelte';
	import Benefit from '../lib/components/home/Benefit.svelte';
	import Calculator from '../lib/components/home/Calculator.svelte';
	import Prequirement from '../lib/components/home/Prequirement.svelte';
</script>

<Calculator />
<Prequirement />
<Benefit />
<!-- TODO: Cambiar icono -->
<!-- TODO: Poner un tooltip o algo por el estilo -->
<a href="/contact" class="fixed bottom-20 right-20 btn-icon btn-filled-success">📞</a>
<Footer />

<script>
	import moment from 'moment';

	// example: "2023/03/07 10:00"
	export let lastDay = '';
	export let resultado;
	let x;

	if (lastDay !== '') {
		let fechaFinal = moment(lastDay);
		x = setInterval(function () {
			let inicio = moment();
			let duracion = moment.duration(fechaFinal.diff(inicio));
			let mes = duracion.months();
			let dia = duracion.days();
			let hora = duracion.hours();
			let minuto = duracion.minutes();
			let segundo = duracion.seconds();
			// let dateFormat = moment(fechaFinal).format('MMMM DD YYYY, h:mm:ss a');

			resultado = [
				mes !== 0 ? mes + (mes === 1 ? ' mes' : ' meses') : '',
				dia !== 0 ? dia + (dia === 1 ? ' dia' : ' dias') : '',
				hora !== 0 ? hora + (hora === 1 ? ' hora' : ' horas') : '',
				minuto !== 0 ? minuto + (minuto === 1 ? ' minuto' : ' minutos') : '',
				segundo !== 0 ? segundo + (segundo === 1 ? ' segundo' : ' segundos') : ''
			]
				.filter(Boolean)
				.join(' ');
		}, 1000);
	} else {
		resultado;
		clearInterval(x);
	}
</script>

<p class="unstyled text-5xl">{resultado}</p>

<script>
	import moment from 'moment';

	export let dateDatabase;
	export let resultado;
	let x;

	if (dateDatabase !== '') {
		let fechaFinal = moment(dateDatabase);
	x =	setInterval(function () {
			let inicio = moment();
			let duracion = moment.duration(fechaFinal.diff(inicio));
			let mes = duracion.months();
			let diaDelMes = duracion.days();
			let hora = duracion.hours();
			let minuto = duracion.minutes();
			let segundo = duracion.seconds();
			let dateFormat = moment(fechaFinal).format('MMMM DD YYYY, h:mm:ss a');
			resultado =
				mes +
				' Mes(es) ' +
				diaDelMes +
				' Dia(s) ' +
				hora +
				' Hora(s) ' +
				minuto +
				' Minuto(s) ' +
				segundo +
				' Segundo(s)';
		}, 1000);
	}else{
		resultado;
		clearInterval(x)
	}
</script>

<h2>Desde temporizador</h2>
<div class="border-white mr">
	<p class="font-bold mt-5 ml-5 text-lg">{resultado}</p>
</div>



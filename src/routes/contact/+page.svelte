<script>
	import Temporizador from "../../lib/components/temporizador/Temporizador.svelte";
	export let form;

	const formData = {
		email: form?.data?.email ?? '',
		messageForm: form?.data?.messageForm ?? ''
	};

	let resultado = 500;
	function contador(e) {
		let maxCaracter = 500;
		let minCarater = e.target.value.length;
		if (minCarater >= maxCaracter) {
			console.log('Has llegado al límite');
		} else {
			resultado = maxCaracter - minCarater;
			return;
		}
	}
</script>

<div class="grid justify-items-center mt-20">
	<article class="text-3xl font-bold">Help form</article>
	<article class="max-h-[200px]">Contact us by Email, if you have any doubts.</article>
</div>
<div class="">
	<form method="POST" action="?" class="p-4 space-y-4 mt-5">
		<label class="max-w-2xl ml-96">
			<label for="email" class="font-bold text-lg">Email</label>
			<input
				type="email"
				placeholder="Enter email address"
				name="email"
				class="{form?.errors?.email ? 'bordered-0' : 'bordered-0'}"
				value={formData.email}
				required
			/>	
				{#if form?.errors?.email}
				<article class="text-red-500">{form?.errors?.email[0]}</article>
				{/if}
		</label>
		
		<label class="max-w-2xl ml-96">
			<label for="messageForm" class="font-bold text-lg">Message</label>
			<span class="flex justify-end text-sm font-bold">{resultado}/500</span>
			<textarea
				placeholder="Enter message"
				name="messageForm"
				id="messageForm"
				class="{form?.errors?.messageForm ? 'bordered-red-800' : 'input-bordered'}"
				on:keyup={contador}
				value={formData.messageForm}
				required
			/>
				{#if form?.errors?.messageForm}
					<article class="text-red-500">{form?.errors?.messageForm[0]}</article>
				{/if}
		</label>
		
		<div class="flex justify-center space-x-2">
			<button class="btn btn-filled-primary w-72">Submit Form</button>
		</div>
	</form>
	<Temporizador dateDatabase='2023-02-15 12:00' resultado="there are no debts pending"></Temporizador>
</div>

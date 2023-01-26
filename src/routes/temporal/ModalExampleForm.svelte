<script>
    // Props
	/** Exposes parent props to this component. */
	export let parent;
	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	// Form Data
	// const formData = {
	// 	name: 'Jane Doe',
	// 	tel: '214-555-1234',
	// 	email: 'jdoe@email.com'
	// };
	// We've created a custom submit function to pass the response and close the modal.
	// function onFormSubmit(){
	// 	if ($modalStore[0].response) $modalStore[0].response(formData);
	// 	modalStore.close();
	// }
	// Base Classes
	const cBase = 'space-y-4';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<div class="modal-example-form {cBase}">
	<!-- Enable for debugging: -->
	<!-- <pre>{JSON.stringify(formData, null, 2)}</pre> -->
	<form class="modal-form {cForm}" action="?/login" method="post">
		<label>
			<span>Email</span>
			<input type="email" name="email" placeholder="Enter name..." />
		</label>
		<label>
			<span>Password</span>
			<input type="password" name="password" placeholder="Enter email address..." />
		</label>

        <button class="btn btn-ghost-surface" on:click={parent.onClose()}>Cancel</button>
        <button type="submit" class="btn btn-filled-primary" on:submit|preventDefault>Submit Form</button>
	</form>
	<!-- prettier-ignore -->
	<!-- <footer class="modal-footer {parent.regionFooter}">
    </footer> -->
</div>

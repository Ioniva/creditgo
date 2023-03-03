<script>
	export let action = '';
	export let method = '';
</script>

<li>
	<form {action} {method}>
		<button type="submit">
			<slot />
		</button>
	</form>
</li>

<style>
	li {
		display: block;
		width: 100%;
		padding: 8px;
		border-bottom: 1px solid #ccc;
		cursor: pointer;
	}
	li:last-child {
		border-bottom: none;
	}
</style>

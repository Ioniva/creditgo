<script>
	export let href = '';
</script>

<li>
	<a {href}>
		<slot />
	</a>
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

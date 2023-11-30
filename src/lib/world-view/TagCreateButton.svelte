<script lang="ts">
	import { getWorldContext } from "$stores";

	const { actions } = getWorldContext();
</script>

<form
	on:submit|preventDefault={(e) => {
		const data = new FormData(e.currentTarget);
		const name = data.get('name');
		if (name && typeof name === 'string') actions.createTag(name);
	}}
>
	<input name="name" />
	<button>create tag</button>
</form>

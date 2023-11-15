<script lang="ts">
	import { actions } from '$lib/app/actions';
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

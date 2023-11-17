<script lang="ts">
	import { getActions } from '$lib/app';

	const actions = getActions();
</script>

<button on:click={() => actions.createDocument()}> create </button>

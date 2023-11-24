<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import { getActions } from '$stores';

	const actions = getActions();
</script>

<Button onclick={() => actions.createDocument()}>create</Button>

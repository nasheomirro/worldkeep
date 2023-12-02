<script lang="ts">
	import Button from '$components/Button.svelte';
import Navbar from '$components/Navbar.svelte';
import type { ProseEditor } from './editor.types';
	type Props = {
		editor: ProseEditor;
	};

	const { editor } = $props<Props>();
</script>

<Navbar>
	{#snippet end()}
		<Button onclick={editor.saveEntry}>save</Button>
	{/snippet}
</Navbar>

<!-- TODO: Create inner editor menu (the one with buttons to change formatting)  -->

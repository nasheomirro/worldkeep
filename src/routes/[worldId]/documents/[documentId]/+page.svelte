<script lang="ts">
	import { page } from '$app/stores';
	import Container from '$components/Container/Container.svelte';
	import Editor from '$lib/editor/Editor.svelte';
</script>

<Container strict>
	<Editor documentId={$page.params.documentId} />
</Container>

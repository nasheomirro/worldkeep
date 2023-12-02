<script lang="ts">
	import Container from '$components/Container.svelte';
	import DocumentEditor from '$lib/editor/DocumentEditor.svelte';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
	let documentId = $derived(data.documentId);
</script>

<Container strict>
	<DocumentEditor {documentId} />
</Container>

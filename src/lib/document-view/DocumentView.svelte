<script lang="ts">
	import { documentStore } from '$lib/app/documents';
	import { sortDocuments } from '$lib/app/utils';
	import DocumentCreateButton from './DocumentCreateButton.svelte';
	import DocumentViewItem from './DocumentViewItem.svelte';

	$: sortedDocuments = sortDocuments($documentStore, 'recent');
</script>

<DocumentCreateButton />

<ul>
	{#each sortedDocuments as document (document.id)}
		<DocumentViewItem {document} />
	{/each}
</ul>

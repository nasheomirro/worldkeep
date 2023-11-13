<script lang="ts">
	import { documents } from '$lib/app/stores';
	import { sortDocuments } from '$lib/app/utils';
	import DocumentCreateButton from './DocumentCreateButton.svelte';
	import DocumentViewItem from './DocumentViewItem.svelte';

	$: sortedDocuments = sortDocuments($documents, 'recent');
</script>

<DocumentCreateButton />

<ul>
	{#each sortedDocuments as document (document.id)}
		<DocumentViewItem {document} />
	{/each}
</ul>

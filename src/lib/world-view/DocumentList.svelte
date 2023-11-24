<script lang="ts">
	import { sortDocuments } from '$stores/utils';
	import DocumentListItem from './DocumentListItem.svelte';
	import DisplayList from '$components/DisplayList/DisplayList.svelte';
	import { getDocuments } from '$stores';

	const documentStore = getDocuments();
	$: sortedDocuments = sortDocuments($documentStore, 'recent');
</script>

<DisplayList>
	{#each sortedDocuments as document (document.id)}
		<DocumentListItem {document} />
	{/each}
</DisplayList>

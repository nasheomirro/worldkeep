<script lang="ts">
	import { sortDocuments } from '$stores/utils';
	import DocumentListItem from './DocumentListItem.svelte';
	import DisplayList from '$components/DisplayList/DisplayList.svelte';
	import type { WorldDocument } from '$stores/types';
	import DocumentCreateButton from './DocumentCreateButton.svelte';

	type Props = {
		prepend?: string;
		documents: WorldDocument[];
	};

	const { prepend, documents } = $props<Props>();
	const sortedDocuments = $derived(sortDocuments(documents, 'recent'));
</script>

<DisplayList>
	<DocumentCreateButton />
	{#each sortedDocuments as document (document.id)}
		<DocumentListItem {document} {prepend} />
	{/each}
</DisplayList>

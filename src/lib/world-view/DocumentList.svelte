<script lang="ts">
	import { sortDocuments } from '$stores/utils';
	import DocumentListItem from './DocumentListItem.svelte';
	import type { WorldDocument } from '$stores/types';

	import CardListButton from '$components/CardListButton.svelte';
	import DisplayList from '$components/CardList.svelte';
	import { getWorldContext } from '$stores';

	type Props = {
		prepend?: string;
		documents: WorldDocument[];
	};

	const { prepend, documents } = $props<Props>();
	const { actions } = getWorldContext();
	const sortedDocuments = $derived(sortDocuments(documents, 'recent'));
</script>

<DisplayList>
	<li>
		<CardListButton onclick={() => actions.createDocument()}>create new document</CardListButton>
	</li>

	{#each sortedDocuments as document (document.id)}
		<DocumentListItem {document} {prepend} />
	{/each}
</DisplayList>

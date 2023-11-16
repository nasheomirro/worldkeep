<script lang="ts">
	import { sortDocuments } from '$lib/app/utils';
	import TagView from './TagView.svelte';
	import DocumentCreateButton from './DocumentCreateButton.svelte';
	import DocumentViewItem from './DocumentViewItem.svelte';
	import TagCreateButton from './TagCreateButton.svelte';
	import { getDocuments } from '$lib/app';

	const documentStore = getDocuments();
	$: sortedDocuments = sortDocuments($documentStore, 'recent');
</script>

<a href="../">back</a>
<DocumentCreateButton />

<ul>
	{#each sortedDocuments as document (document.id)}
		<DocumentViewItem {document} />
	{/each}
</ul>

<TagCreateButton />
<TagView />

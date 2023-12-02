<!-- The component responsible for communicating with the global store. -->
<script lang="ts">
	import './editor.scss';
	import type { WorldDocument } from '$stores/types';
	import { findEntry } from '$stores/utils';
	import EntryEditor from './EntryEditor.svelte';
	import EditorMenu from './EditorMenu.svelte';
	import { getWorldContext } from '$stores';

	/** the id of the document to open */
	export let documentId: string;

	const { actions, documents } = getWorldContext();
	$: activeDocument = findEntry($documents, documentId);

	const saveDocumentFromEditor = (document: WorldDocument) => {
		if (activeDocument) {
			actions.updateDocument(activeDocument.id, document);
		}
	};
</script>

{#if activeDocument}
	<EntryEditor entry={activeDocument} onsave={saveDocumentFromEditor}>
		{#snippet children(editor)}
			<EditorMenu {editor} />
		{/snippet}
	</EntryEditor>
{:else}
	<div>not found</div>
{/if}

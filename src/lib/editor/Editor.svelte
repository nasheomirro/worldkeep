<!-- The component responsible for communicating with the global store. -->
<script lang="ts">
	import type { WorldDocument } from '$lib/app/types';
	import { findDocument } from '$lib/app/utils';
	import ContentEditor from './ProseEditor.svelte';
	import EditorMenu from './EditorMenu.svelte';
	import { getActions, getDocuments } from '$lib/app';

	/** the id of the document to open */
	export let documentId: string;

	const documentStore = getDocuments();
	const actions = getActions();

	$: activeDocument = findDocument($documentStore, documentId);
	
	const saveDocumentFromEditor = (event: CustomEvent<WorldDocument>) => {
		if (activeDocument) {
			actions.updateDocument(activeDocument.id, { ...event.detail });
		}
	};
</script>

{#if activeDocument}
	<ContentEditor document={activeDocument} on:save={saveDocumentFromEditor} let:editor>
		<EditorMenu {editor} />
	</ContentEditor>
{/if}

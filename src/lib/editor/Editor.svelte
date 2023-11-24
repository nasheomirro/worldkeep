<!-- The component responsible for communicating with the global store. -->
<script lang="ts">
	import "./editor.scss";
	import type { WorldDocument } from '$stores/types';
	import { findDocument } from '$stores/utils';
	import { getActions, getDocuments } from '$stores';
	import ProseEditor from './ProseEditor.svelte';
	import EditorMenu from './EditorMenu.svelte';

	/** the id of the document to open */
	export let documentId: string;

	const documentStore = getDocuments();
	const actions = getActions();

	$: activeDocument = findDocument($documentStore, documentId);

	const saveDocumentFromEditor = (document: WorldDocument) => {
		if (activeDocument) {
			actions.updateDocument(activeDocument.id, document);
		}
	};
</script>

{#if activeDocument}
	<ProseEditor document={activeDocument} onsave={saveDocumentFromEditor} let:editor>
		<EditorMenu {editor} />
	</ProseEditor>
{/if}

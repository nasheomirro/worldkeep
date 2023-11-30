<!-- The component responsible for communicating with the global store. -->
<script lang="ts">
	import "./editor.scss";
	import type { WorldDocument } from '$stores/types';
	import { findDocument } from '$stores/utils';
	import ProseEditor from './ProseEditor.svelte';
	import EditorMenu from './EditorMenu.svelte';
	import { getWorldContext } from "$stores";

	/** the id of the document to open */
	export let documentId: string;

	const { actions, documents } = getWorldContext();

	$: activeDocument = findDocument($documents, documentId);

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

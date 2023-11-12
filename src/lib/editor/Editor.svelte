<!-- The component responsible for communicating with the global store. -->
<script lang="ts">
	import { documents } from '$lib/app/documents';
	import { findDocument } from '$lib/app/utils';
	import ContentEditor from './ContentEditor.svelte';
	import EditorMenu from './EditorMenu.svelte';

	/** the id of the object to open */
	export let documentId: string;
	$: activeDocument = findDocument($documents, documentId);

	const saveDocumentContent = (content: object) => {
		if (activeDocument) {
			documents.updateDocument({
				...activeDocument,
				content
			});
		}
	};
</script>

{#if activeDocument}
	<ContentEditor documentObject={activeDocument.content} on:save={saveDocumentContent} let:editor>
		<EditorMenu {editor} />
	</ContentEditor>
{/if}

<!-- The component responsible for communicating with the global store. -->
<script lang="ts">
	import { documents } from '$lib/app/documents';
	import type { DocumentNote } from '$lib/app/types';
	import { findDocument } from '$lib/app/utils';
	import ContentEditor from './ContentEditor.svelte';
	import EditorMenu from './EditorMenu.svelte';

	/** the id of the object to open */
	export let documentId: string;

	$: activeDocument = findDocument($documents, documentId);

	const saveUpdatedDocument = (event: CustomEvent<DocumentNote>) => {
		if (activeDocument) {
			documents.updateDocument({
				...activeDocument,
				...event.detail
			});
		}
	};
</script>

{#if activeDocument}
	<ContentEditor document={activeDocument} on:save={saveUpdatedDocument} let:editor>
		<EditorMenu {editor} />
	</ContentEditor>
{/if}

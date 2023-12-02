<!-- The component responsible for communicating with the global store. -->
<script lang="ts">
	import './editor.scss';
	import type { EditableEntry } from '$stores/types';
	import { findEntry } from '$stores/utils';
	import EntryEditor from './EntryEditor.svelte';
	import EditorMenu from './EditorMenu.svelte';
	import { getWorldContext } from '$stores';

	/** the id of the document to open */
	export let elementId: string;

	const { actions, elements } = getWorldContext();
	$: activeElement = findEntry($elements, elementId);

	const saveElementFromEditor = (entry: EditableEntry) => {
		if (activeElement) {
			actions.updateElement(activeElement.id, entry);
		}
	};
</script>

{#if activeElement}
	<EntryEditor entry={activeElement} onsave={saveElementFromEditor}>
		{#snippet children(editor)}
			<EditorMenu {editor} />
		{/snippet}
	</EntryEditor>
{:else}
	<div>not found</div>
{/if}

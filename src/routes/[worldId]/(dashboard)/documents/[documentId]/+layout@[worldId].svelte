<script lang="ts">
	import { getWorldContext } from '$stores';
	import type { LayoutData } from './$types';
	import { findEntry } from '$stores/app.utils';
	import type { WorldDocument } from '$stores/app.types';
	import { EditorDraft } from '$lib/editor/state.svelte';
	import { setDraftContext } from './context';
	import Container from '$components/Container.svelte';
	import Navbar from '$components/Navbar.svelte';
	import Button from '$components/Button.svelte';

	const { data } = $props<{ data: LayoutData }>();
	const { documents, actions } = getWorldContext();

	// changes to active document outside of draft isn't accounted for.
	const activeDocument = findEntry($documents, data.documentId) as WorldDocument;
	const draft = new EditorDraft(activeDocument, {
		onsave: (newDocument) => {
			actions.updateDocument(newDocument.id, newDocument);
		}
	});

	const prepend = `/${data.worldId}/documents/${data.documentId}/`;
	setDraftContext(draft);
</script>

<Container strict>
	<Navbar>
		{#snippet start()}
			<a href={prepend + ''}>edit</a>
			<a href={prepend + 'elements'}>elements</a>
		{/snippet}
		{#snippet end()}
			<Button onclick={draft.saveDraft}>save</Button>
		{/snippet}
	</Navbar>
</Container>
<slot />

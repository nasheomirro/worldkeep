<script lang="ts">
	import { getWorldContext } from '$stores';
	import type { LayoutData } from './$types';
	import { setDraftContext } from './context';
	import { findEntry } from '$stores/app.utils';
	import type { WorldDocument } from '$stores/app.types';
	import { EditorDraft } from '$lib/editor/state.svelte';
	import Container from '$components/Container.svelte';
	import Navbar from '$components/Navbar.svelte';
	import Button from '$components/Button.svelte';

	const { data } = $props<{ data: LayoutData }>();
	const { elements, actions } = getWorldContext();

	// changes to active element outside of draft isn't accounted for.
	const activeElement = findEntry($elements, data.elementId) as WorldDocument;
	const draft = new EditorDraft(activeElement, {
		onsave: (newDocument) => {
			actions.updateElement(newDocument.id, newDocument);
		}
	});

	setDraftContext(draft);
</script>

<Container strict>
	<Navbar>
		{#snippet end()}
			<Button onclick={draft.saveDraft}>save</Button>
		{/snippet}
	</Navbar>
</Container>

<slot />

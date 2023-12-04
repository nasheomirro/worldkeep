import type { EditorDraft } from '$lib/editor/state.svelte';
import type { WorldDocument } from '$stores/app.types';
import { getContext, setContext } from 'svelte';

const key = Symbol();

export function setDraftContext(draft: EditorDraft<WorldDocument>) {
	setContext(key, draft);
}

export function getDraftContext() {
	return getContext<EditorDraft<WorldDocument>>(key);
}

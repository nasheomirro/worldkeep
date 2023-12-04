<script lang="ts">
	import Button from '$components/Button.svelte';
	import Navbar from '$components/Navbar.svelte';
	import type { EditableEntry } from '$stores/app.types';
	import type { EditorDraft } from './state.svelte';

	type Props = {
		draft: EditorDraft<EditableEntry>;
		/** the value to prepend `hrefs` to.*/
		prepend: string;
	};

	const { draft, prepend } = $props<Props>();
</script>

<Navbar>
	{#snippet start()}
		<a href={prepend + ''}>edit</a>
		<a href={prepend + 'elements'}>elements</a>
	{/snippet}
	{#snippet end()}
		<Button onclick={draft.saveDraft}>save</Button>
	{/snippet}
</Navbar>

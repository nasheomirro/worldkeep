<script lang="ts">
	import Container from '$components/Container.svelte';
	import ContentEditor from '$lib/editor/ContentEditor.svelte';
	import { getDraftContext } from './context';

	const draft = getDraftContext();
</script>

<Container strict>
	<ContentEditor initialState={draft.state} saveState={(newState) => (draft.state = newState)} />
</Container>

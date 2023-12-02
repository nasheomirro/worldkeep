<script lang="ts">
	import Container from '$components/Container.svelte';
	import ElementEditor from '$lib/editor/ElementEditor.svelte';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
	let elementId = $derived(data.elementId);
</script>

<Container strict>
	<ElementEditor {elementId} />
</Container>

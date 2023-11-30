<script lang="ts">
	import Container from '$components/Container/Container.svelte';
	import ElementList from '$lib/world-view/ElementList.svelte';
	import { getWorldContext } from '$stores';

	const { elements } = getWorldContext();
</script>

<Container>
	<ElementList elements={$elements} />
</Container>

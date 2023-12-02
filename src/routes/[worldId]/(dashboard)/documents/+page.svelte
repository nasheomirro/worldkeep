<script lang="ts">
	import { page } from '$app/stores';
	import Container from '$components/Container.svelte';
	import DocumentList from '$lib/world-view/DocumentList.svelte';
	import { getWorldContext } from '$stores';

	const { documents } = getWorldContext();
</script>

<Container>
	<DocumentList prepend={$page.url.pathname} documents={$documents} />
</Container>

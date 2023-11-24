<script lang="ts">
	import Container from '$components/Container/Container.svelte';
	import Nav from '$components/Nav/Nav.svelte';
	import DocumentCreateButton from '$lib/world-view/DocumentCreateButton.svelte';
	import DocumentList from '$lib/world-view/DocumentList.svelte';
	import { getWorldList } from '$stores';
	import type { WorldData } from '$stores/types.ts';

	export let data;

	const worlds = getWorldList();
	$: world = $worlds.find((worlds) => worlds.id === data.worldId) as WorldData;
</script>

<Container>
	<Nav>
		<DocumentCreateButton />
	</Nav>
	<div class="world-info">
		<h1>{world.name || 'No Name'}</h1>
		<p>{world.description || 'no description'}</p>
	</div>
	<DocumentList />
</Container>

<style lang="scss">
	@use '$styles' as s;

	.world-info {
		padding: s.padding(10) 0;
		margin-bottom: s.padding(10);
		border-bottom: 1px solid s.$secondary;

		> h1 {
			font-size: 2.5rem;
			margin-bottom: s.padding(2);
		}
	}
</style>

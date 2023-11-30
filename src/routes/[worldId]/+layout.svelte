<script lang="ts">
	import Container from '$components/Container/Container.svelte';
	import Nav from '$components/Nav/Nav.svelte';
	import { getWorldList, setWorldContext } from '$stores';
	import type { WorldMeta } from '$stores/types';
	import type { LayoutData } from './$types';

	let { data } = $props<{ data: LayoutData }>();

	setWorldContext({
		actions: data.world.actions,
		documents: data.world.createDocumentStore(),
		elements: data.world.createElementStore(),
		tags: data.world.createTagStore()
	});

	const worlds = getWorldList();
	const world = $derived($worlds.find((worlds) => worlds.id === data.worldId) as WorldMeta);

	function getPath(append: string) {
		return '/' + world.id + '/' + append;
	}
</script>

<Container>
	<Nav>
		{#snippet start()}
			<a href={getPath('')}>recent</a>
			<a href={getPath('documents')}>documents</a>
			<a href={getPath('elements')}>elements</a>
			<a href={getPath('tags')}>tags</a>
		{/snippet}
	</Nav>
	<div class="world-info">
		<h1>{world.name || 'No Name'}</h1>
		<p>{world.description || 'no description'}</p>
	</div>
</Container>

<slot />

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

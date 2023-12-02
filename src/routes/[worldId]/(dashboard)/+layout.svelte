<script lang="ts">
	import Container from '$components/Container.svelte';
	import Navbar from '$components/Navbar.svelte';
	import { getWorldList } from '$stores';
	import type { WorldMeta } from '$stores/types';
	import type { LayoutData } from './$types';

	let { data } = $props<{ data: LayoutData }>();

	const worlds = getWorldList();
	const world = $derived($worlds.find((worlds) => worlds.id === data.worldId) as WorldMeta);

	function getPath(append: string) {
		return '/' + world.id + '/' + append + (append ? '/' : '');
	}
</script>

<!-- this is the only reason we are grouping is to have this but get rid of it when in an editor -->
<Container>
	<Navbar>
		{#snippet start()}
			<a href={getPath('')}>recent</a>
			<a href={getPath('documents')}>documents</a>
			<a href={getPath('elements')}>elements</a>
			<a href={getPath('tags')}>tags</a>
		{/snippet}
	</Navbar>
	<div class="world-info">
		<h1>{world.name || 'No Name'}</h1>
		<p>{world.description || 'no description'}</p>
	</div>
</Container>

<slot />

<style lang="scss">
	@use '$styles' as t;

	.world-info {
		padding: 2.5rem 0;
		margin-bottom: 2.5rem;
		border-bottom: 1px solid #{t.$theme-color-surface-border};

		> h1 {
			font-size: 2.5rem;
			margin-bottom: 0.5rem;
		}
	}
</style>

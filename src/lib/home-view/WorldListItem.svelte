<script lang="ts">
	import DisplayListItem from '$components/DisplayListItem/DisplayListItem.svelte';
	import Button from '$components/Button/Button.svelte';
	import { getWorldList } from '$stores';
	import type { WorldData } from '$stores/types';

	type Props = {
		world: WorldData;
	};

	let { world } = $props<Props>();
	const worldList = getWorldList();
</script>

<DisplayListItem>
	<h2>
		<a href={world.id}>
			{world.name || 'no name'}
		</a>
	</h2>
	<p>
		{world.description || 'no description'}
	</p>
	{#snippet buttons()}
		<Button size="sm" color="secondary" onclick={() => worldList.deleteWorldData(world.id)}
			>delete</Button
		>
	{/snippet}
</DisplayListItem>

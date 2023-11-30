<script lang="ts">
	import DisplayListItem from '$components/DisplayListItem/DisplayListItem.svelte';
	import Button from '$components/Button/Button.svelte';
	import { getWorldList } from '$stores';
	import type { WorldMeta } from '$stores/types';

	type Props = {
		world: WorldMeta;
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
		<Button size="sm" color="secondary" onclick={() => worldList.deleteWorldMeta(world.id)}
			>delete</Button
		>
	{/snippet}
</DisplayListItem>

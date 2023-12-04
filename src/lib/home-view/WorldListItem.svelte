<script lang="ts">
	import DisplayListItem from '$components/CardListItem.svelte';
	import Button from '$components/Button.svelte';
	import { getWorldList } from '$stores';
	import type { WorldMeta } from '$stores/app.types';

	type Props = {
		world: WorldMeta;
	};

	let { world } = $props<Props>();
	const worldList = getWorldList();
</script>

<DisplayListItem>
	{#snippet title()}
		<a href={world.id}>{world.name || 'no name'}</a>
	{/snippet}

	{#snippet description()}
		<svelte:fragment>{world.description || 'no description found.'}</svelte:fragment>
	{/snippet}

	{#snippet buttons()}
		<Button size="small" bgColor="secondary" onclick={() => worldList.deleteWorldMeta(world.id)}
			>delete</Button
		>
	{/snippet}
</DisplayListItem>

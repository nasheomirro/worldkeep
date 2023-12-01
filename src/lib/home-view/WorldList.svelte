<script lang="ts">
	import DisplayList from '$components/CardList.svelte';
	import WorldListItem from './WorldListItem.svelte';
	import { getWorldList } from '$stores';

	const worldList = getWorldList();
</script>

<DisplayList>
	{#each $worldList as world}
		<WorldListItem {world} />
	{/each}
</DisplayList>

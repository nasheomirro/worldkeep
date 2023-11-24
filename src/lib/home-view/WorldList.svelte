<script lang="ts">
	import DisplayList from '$components/DisplayList/DisplayList.svelte';
	import { getWorldList } from '$stores';
	import WorldListItem from './WorldListItem.svelte';

	const worldList = getWorldList();
</script>

<DisplayList>
	{#each $worldList as world}
		<WorldListItem {world} />
	{/each}
</DisplayList>

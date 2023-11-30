<script lang="ts">
	import DisplayList from '$components/DisplayList/DisplayList.svelte';
	import ElementListItem from './ElementListItem.svelte';
	import ElementCreateButton from './ElementCreateButton.svelte';
	import type { WorldElement } from '$stores/types';

	type Props = {
		elements: WorldElement[];
	};

	let { elements } = $props<Props>();
</script>

<DisplayList>
	<ElementCreateButton />
	{#each elements as element}
		<ElementListItem {element} />
	{/each}
</DisplayList>

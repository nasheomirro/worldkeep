<script lang="ts">
	import ElementListItem from './ElementListItem.svelte';
	import type { WorldElement } from '$stores/types';
	import DisplayList from '$components/CardList.svelte';
	import CardListButton from '$components/CardListButton.svelte';
	import { getWorldContext } from '$stores';

	type Props = {
		elements: WorldElement[];
	};

	const { elements } = $props<Props>();
	const { actions } = getWorldContext();
</script>

<DisplayList>
	<li>
		<CardListButton onclick={() => actions.createElement()}>create new element</CardListButton>
	</li>
	{#each elements as element}
		<ElementListItem {element} />
	{/each}
</DisplayList>

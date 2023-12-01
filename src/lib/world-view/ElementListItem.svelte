<script lang="ts">
	import DisplayListItem from '$components/CardListItem.svelte';
	import Button from '$components/Button.svelte';
	import type { WorldElement } from '$stores/types';
	import { getWorldContext } from '$stores';

	type Props = { element: WorldElement; prepend?: string };
	const { element, prepend = '' } = $props<Props>();
	const { actions } = getWorldContext();

	let titleText = element.title || 'Empty Title';
	let descriptionText = element.description || 'No description';
</script>

<DisplayListItem>
	{#snippet title()}
		<a href={prepend + element.id}>{titleText}</a>
	{/snippet}

	{#snippet description()}
		<svelte:fragment>{descriptionText}</svelte:fragment>
	{/snippet}

	{#snippet buttons()}
		<Button bgColor="secondary" size="small" onclick={() => actions.deleteElement(element.id)}
			>delete</Button
		>
	{/snippet}
</DisplayListItem>

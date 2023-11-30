<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import DisplayListItem from '$components/DisplayListItem/DisplayListItem.svelte';
	import { getWorldContext } from '$stores';
	import type { WorldElement } from '$stores/types';

	const { element } = $props<{ element: WorldElement }>();
	const { actions } = getWorldContext();

	let title = element.title || 'Empty Title';
	let description = element.description || 'No description';
</script>

<DisplayListItem>
	<a href={element.id}>
		<h2>{title}</h2>
	</a>
	<p>{description}</p>
	{#snippet buttons()}
		<Button color="secondary" size="sm" onclick={() => actions.deleteElement(element.id)}
			>delete</Button
		>
	{/snippet}
</DisplayListItem>

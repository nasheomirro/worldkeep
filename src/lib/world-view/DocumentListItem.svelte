<script lang="ts">
	import DisplayListItem from '$components/CardListItem.svelte';
	import Button from '$components/Button.svelte';
	import { getWorldContext } from '$stores';
	import type { WorldDocument } from '$stores/types';

	type Props = { document: WorldDocument; prepend?: string };
	const { document, prepend = '' } = $props<Props>();
	const { actions } = getWorldContext();

	let titleText = document.title || 'Empty Title';
	let descriptionText = document.description || 'No description';
</script>

<DisplayListItem>
	{#snippet title()}
		<a href={prepend + document.id}>{titleText}</a>
	{/snippet}

	{#snippet description()}
		<svelte:fragment>{descriptionText}</svelte:fragment>
	{/snippet}

	{#snippet buttons()}
		<Button bgColor="secondary" size="small" onclick={() => actions.deleteDocument(document.id)}
			>delete</Button
		>
	{/snippet}
</DisplayListItem>

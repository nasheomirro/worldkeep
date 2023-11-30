<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import DisplayListItem from '$components/DisplayListItem/DisplayListItem.svelte';
	import { getWorldContext } from '$stores';
	import type { WorldDocument } from '$stores/types';

	type Props = { document: WorldDocument; prepend?: string };
	const { document, prepend = '' } = $props<Props>();
	const { actions } = getWorldContext();

	let title = document.title || 'Empty Title';
	let description = document.description || 'No description';
</script>

<DisplayListItem>
	<a href={prepend + document.id}>
		<h2>{title}</h2>
	</a>
	<p>{description}</p>
	{#snippet buttons()}
		<Button color="secondary" size="sm" onclick={() => actions.deleteDocument(document.id)}
			>delete</Button
		>
	{/snippet}
</DisplayListItem>

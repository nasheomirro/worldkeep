<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import DisplayListItem from '$components/DisplayListItem/DisplayListItem.svelte';
	import { getActions } from '$stores';
	import type { WorldDocument } from '$stores/types';

	export let document: WorldDocument;

	const actions = getActions();

	let title = document.title || 'Empty Title';
	let description = document.description || 'No description';
</script>

<DisplayListItem>
	<a href={document.id}>
		<h2>{title}</h2>
	</a>
	<p>{description}</p>
	{#snippet buttons()}
		<Button color="secondary" size="sm" onclick={() => actions.deleteDocument(document.id)}
			>delete</Button
		>
	{/snippet}
</DisplayListItem>

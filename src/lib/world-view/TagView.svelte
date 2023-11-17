<script lang="ts">
	import { getActions, getTags } from '$lib/app';

	const tagStore = getTags();
	const actions = getActions();
</script>

<ul>
	{#each $tagStore as tag}
		<li>
			<div>{tag.name} - {tag.id}</div>
			<button on:click={() => actions.deleteTag(tag.id)}>delete</button>
		</li>
	{/each}
</ul>

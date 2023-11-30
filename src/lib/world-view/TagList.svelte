<script lang="ts">
	import { getWorldContext } from '$stores';

	const { actions, tags } = getWorldContext();
</script>

<ul>
	{#each $tags as tag}
		<li>
			<div>{tag.name} - {tag.id}</div>
			<button on:click={() => actions.deleteTag(tag.id)}>delete</button>
		</li>
	{/each}
</ul>

<script lang="ts">
	import { actions } from '$lib/app/actions';
	import { documentTagStore } from '$lib/app/tags';
</script>

<ul>
	{#each $documentTagStore as tag}
		<li>
			<div>{tag.name} - {tag.id}</div>
			<button on:click={() => actions.deleteTag(tag.id)}>delete</button>
		</li>
	{/each}
</ul>

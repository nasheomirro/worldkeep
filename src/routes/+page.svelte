<script lang="ts">
	import { worlds } from '$lib/app/stores';
	import { nanoid } from 'nanoid';
</script>

<button on:click={() => worlds.createWorld(nanoid(8))}> create new world </button>

<ul>
	{#each $worlds.worlds as world}
		<a href={world.id}>
			{world.name || 'no name'}
		</a>
	{/each}
</ul>

<script lang="ts">
	import { worldDataStore } from '$lib/app/worlds';
</script>

<button on:click={() => worldDataStore.createWorldData()}> create new world </button>

<ul>
	{#each $worldDataStore.worlds as world}
		<li>
			<a href={world.id}>
				{world.name || 'no name'}
			</a>
			<button on:click={() => worldDataStore.deleteWorldData(world.id)}>delete</button>
		</li>
	{/each}
</ul>

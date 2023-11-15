<script lang="ts">
	import { actions } from '$lib/app/actions';
	import { worldDataStore } from '$lib/app/worlds';
</script>

<button on:click={() => actions.createWorldData()}> create new world </button>

<ul>
	{#each $worldDataStore.worlds as world}
		<li>
			<a href={world.id}>
				{world.name || 'no name'}
			</a>
			<button on:click={() => actions.deleteWorldData(world.id)}>delete</button>
		</li>
	{/each}
</ul>

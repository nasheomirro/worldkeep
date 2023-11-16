<script lang="ts">
	import { getWorldList } from '$lib/app';

	const worldList = getWorldList();
</script>

<button on:click={() => worldList.createWorldData()}> create new world </button>

<ul>
	{#each $worldList as world}
		<li>
			<a href={world.id}>
				{world.name || 'no name'}
			</a>
			<button on:click={() => worldList.deleteWorldData(world.id)}>delete</button>
		</li>
	{/each}
</ul>

<script lang="ts">
	import { getWorldList } from '$stores';
	import Navbar from '$components/Navbar.svelte';
	import Container from '$components/Container.svelte';
	import WorldList from '$lib/home-view/WorldList.svelte';
	import Button from '$components/Button.svelte';

	const worldList = getWorldList();
</script>

<Container>
	<Navbar>
		{#snippet end()}
			<Button onclick={() => worldList.createWorldMeta()}>create new world</Button>
		{/snippet}
	</Navbar>
	<WorldList />
</Container>

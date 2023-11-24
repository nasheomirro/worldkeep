<script lang="ts">
	import { getWorldList } from '$stores';
	import Container from '$components/Container/Container.svelte';
	import Button from '$components/Button/Button.svelte';
	import Nav from '$components/Nav/Nav.svelte';
	import WorldList from '$lib/home-view/WorldList.svelte';

	const worldList = getWorldList();
</script>

<Container>
	<Nav>
		<Button onclick={() => worldList.createWorldData()}>create new world</Button>
	</Nav>
	<WorldList />
</Container>

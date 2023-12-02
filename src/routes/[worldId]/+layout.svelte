<script lang="ts">
	import { setWorldContext } from '$stores';
	import type { LayoutData } from './$types';

	let { data } = $props<{ data: LayoutData }>();

	setWorldContext({
		actions: data.world.actions,
		documents: data.world.createDocumentStore(),
		elements: data.world.createElementStore(),
		tags: data.world.createTagStore()
	});
</script>

<slot />

<script lang="ts">
	import { setActions, setDocuments, setTags } from '$stores';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	setDocuments(data.world.createDocumentStore());
	setTags(data.world.createTagStore());
	setActions(data.world.actions);
</script>

<slot />

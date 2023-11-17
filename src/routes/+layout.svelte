<script lang="ts">
	import { setWorldList } from '$lib/app';
	import type { LayoutData } from './$types';
	import "$lib/scss/init.scss";

	export let data: LayoutData;
	setWorldList(data.worldList);
</script>

<slot />

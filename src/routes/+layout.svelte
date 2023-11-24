<script lang="ts">
	import { setWorldList } from '$stores';
	import type { LayoutData } from './$types';
	import '$styles/init.scss';

	export let data: LayoutData;
	setWorldList(data.worldList);
</script>


<slot />
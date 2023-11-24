<script lang="ts">
	import type { GetProps } from '$components/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = GetProps<HTMLAttributes<HTMLDivElement>, 'class'>;
	let { children, ...rest } = $props<Props>();
</script>

<div class="nav" {...rest}>
	{@render children()}
</div>

<style lang="scss">
	@use 'styles' as *;
</style>

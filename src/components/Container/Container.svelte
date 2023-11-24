<script lang="ts">
	import { className, type GetProps, type Merge } from '$components/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type ContainerProps = {
		strict?: boolean;
	};

	type Attributes = GetProps<HTMLAttributes<HTMLDivElement>, 'class'>;

	let { children, strict = false, ...rest } = $props<Merge<Attributes, ContainerProps>>();
</script>

<div class={className('container', { strict })} {...rest}>
	{@render children()}
</div>

<style lang="scss">
	@use 'styles' as *;
</style>

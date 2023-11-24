<script lang="ts">
	import { className, type GetProps, type Merge } from '$components/utils';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type ButtonProps = {
		size?: 'sm' | 'md' | 'lg';
		color?: 'primary' | 'secondary';
		radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
	};

	type Attributes = GetProps<HTMLButtonAttributes, 'class'>;

	let {
		children,
		color = 'primary',
		size = 'md',
		radius = 'md',
		...rest
	} = $props<Merge<Attributes, ButtonProps>>();
</script>

<button class={className('button', { color, size, radius })} {...rest}>{@render children()}</button>

<style lang="scss">
	@use 'styles' as *;
</style>

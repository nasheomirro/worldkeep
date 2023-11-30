<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getClassName, type GetProps, type RequiredChildren } from '../utils';
	import type { ContainerMods } from './container.types';

	type OwnProps = ContainerMods & RequiredChildren;
	type Props = GetProps<HTMLAttributes<HTMLDivElement>, OwnProps>;

	let { children, strict = false, ...rest } = $props<Props>();

	const className = $derived(
		getClassName('container', {
			strict
		})
	);
</script>

<div class={className} {...rest}>
	{@render children()}
</div>

<style lang="scss">
	@use './container' as *;
</style>

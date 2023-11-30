<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { getClassName, type GetProps, type RequiredChildren } from '../utils';
	import type { ButtonMods } from './button.types';

	type OwnProps = RequiredChildren & ButtonMods;
	type Props = GetProps<HTMLButtonAttributes, OwnProps>;

	let {
		children,
		bgColor = 'primary',
		radius = 'normal',
		size = 'medium',
		...rest
	} = $props<Props>();

	const className = $derived(
		getClassName('button', {
			bgColor,
			radius,
			size
		})
	);
</script>

<button class={className} {...rest}>
	{@render children()}
</button>

<style lang="scss">
	@use './button' as *;
</style>

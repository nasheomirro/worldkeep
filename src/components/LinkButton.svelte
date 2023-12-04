<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { getClassName, type GetProps, type RequiredChildren } from '$elements/elements.utils';
	import type { ButtonMods } from '$elements/types/button.types';

	type OwnProps = RequiredChildren & ButtonMods;
	type Props = GetProps<HTMLAnchorAttributes, OwnProps>;

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

<a class={className} {...rest}>
	{@render children()}
</a>

<style lang="scss">
	@use '$elements/button' as *;
</style>

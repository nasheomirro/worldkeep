<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { ButtonMods } from '$elements/types/button.types';
	import { getClassName, type GetProps, type RequiredChildren } from '$elements/elements.utils';

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
	@use '$elements/button' as *;
</style>

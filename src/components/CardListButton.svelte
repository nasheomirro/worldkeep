<script lang="ts">
	import type { GetProps, RequiredChildren } from '$elements/utils';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = GetProps<HTMLButtonAttributes, RequiredChildren>;
	const { children, ...rest } = $props<Props>();
</script>

<button class="cl-btn" {...rest}>
	{@render children()}
</button>

<style lang="scss">
	@use '$styles' as t;
	@use '$elements/card' as c;

	$card_button-color: t.$theme-color-secondary;

	.cl-btn {
		flex-direction: column;
		width: 100%;
		height: 100%;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		color: #{$card_button-color};
		background-color: #{c.$card-background-color};
		border: 2px dashed #{c.$card-border-color};
		border-radius: #{c.$card-border-radius};
		font-size: 1.125rem;
		transition: filter 200ms ease-in-out;
		
		&:hover {
			filter: brightness(0.9);
		}
	}
</style>

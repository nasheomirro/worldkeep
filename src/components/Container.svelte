<script lang="ts">
	import { getClassName, type GetProps, type RequiredChildren } from '$elements/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type OwnProps = {
		strict?: boolean;
	} & RequiredChildren;

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
	@use '$styles' as t;

	$container-width: 1280px;
	$container-width-strict: 1080px;

	.container {
		display: flex;
		margin: 0 auto;
		max-width: #{$container-width};
		flex-direction: column;
		padding: 1.25rem;

		@include t.above('md') {
			padding-left: 2.5rem;
			padding-right: 2.5rem;
		}

		&--strict {
			max-width: #{$container-width-strict};
		}
	}
</style>

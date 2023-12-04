<script lang="ts">
	import type { GetProps } from '$elements/elements.utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type OwnProps = {
		start?: Snippet;
		end?: Snippet;
	};

	type Props = GetProps<HTMLAttributes<HTMLDivElement>, OwnProps>;
	let { start, end, ...rest } = $props<Props>();
</script>

<div class="navbar" {...rest}>
	<div class="inner-container">
		{#if start}
			{@render start()}
		{/if}
	</div>
	<div class="inner-container">
		{#if end}
			{@render end()}
		{/if}
	</div>
</div>

<style lang="scss">
	@use '$styles' as t;

	.navbar {
		display: flex;
		justify-content: space-between;
		margin-bottom: 2.5rem;

		.inner-container {
			display: flex;
			gap: 2rem;
		}
	}
</style>

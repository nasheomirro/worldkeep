<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { GetProps, RequiredChildren } from '$elements/utils';

	type Props = GetProps<HTMLAttributes<HTMLUListElement>, RequiredChildren>;
	const { children, ...rest } = $props<Props>();
</script>

<ul class="display-list" {...rest}>
	{@render children()}
</ul>

<style lang="scss">
	@use '$styles' as t;

	.display-list {
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: 1fr;
		padding: 0;
		list-style-type: none;
		gap: 1rem;

		@include t.above('md') {
			grid-template-columns: 1fr 1fr;
			gap: 1.5rem;
		}

		@include t.above('lg') {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>

<script lang="ts">
	import type { GetProps } from '$components/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = GetProps<HTMLAttributes<HTMLUListElement>, 'class'>;
	let { children, ...rest } = $props<Props>();
</script>

<ul class="list" {...rest}>
	{@render children()}
</ul>

<style lang="scss">
	@use 'styles' as *;
</style>

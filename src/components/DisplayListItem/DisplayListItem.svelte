<script lang="ts">
	import type { GetProps } from '$components/utils';
	import type { HTMLLiAttributes } from 'svelte/elements';

	type Props = GetProps<HTMLLiAttributes, 'class'> & {
		buttons?: any;
	};
	let { children, buttons, ...rest } = $props<Props>();
</script>

<li class="list-item" {...rest}>
	{@render children()}
	{#if buttons}
		<div class="buttons">
			{@render buttons()}
		</div>
	{/if}
</li>

<style lang="scss">
	@use 'styles' as *;
</style>

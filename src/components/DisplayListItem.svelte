<script lang="ts">
	import type { GetProps } from '$elements/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLLiAttributes } from 'svelte/elements';

	type OwnProps = {
		title: string;
		description: string;
		buttons?: Snippet;
	};

	type Props = GetProps<HTMLLiAttributes, OwnProps>;
	let { title, description, buttons, ...rest } = $props<Props>();
</script>

<li class="list-item" {...rest}>
	<h2>{title}</h2>
	<p>{description}</p>

	{#if buttons}
		<div class="buttons">
			{@render buttons()}
		</div>
	{/if}
</li>

<style lang="scss">
	@use '$styles' as t;
	@use '$elements/card/card' as c;

	.list-item {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		border: 1px solid #{c.$card-border-color};
		border-radius: #{c.$card-border-radius};

		> h2,
		> p {
			margin-bottom: 0.5rem;
		}

		> .buttons {
			margin-top: auto;
			margin-left: auto;
		}
	}
</style>

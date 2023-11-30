<script lang="ts">
	import { getWorldContext } from '$stores';

	const { actions } = getWorldContext();
</script>

<li>
	<button class="_list-item" onclick={() => actions.createElement()}>create new element</button>
</li>

<style lang="scss">
	@use '$styles' as s;
	@use '$components/DisplayListItem/styles';

	._list-item {
		@extend .list-item;
		flex-direction: column;
		width: 100%;
		height: 100%;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		border: 2px dashed s.$secondary;
		font-size: 1.5srem;
		font-family: s.$font-normal;
		background-color: transparent;
		color: s.$secondary;
	}
</style>
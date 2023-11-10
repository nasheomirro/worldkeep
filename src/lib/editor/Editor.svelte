<script lang="ts">
	import { onMount } from 'svelte';
	import { createEditor, type EditorStore } from '.';

	import 'prosemirror-view/style/prosemirror.css';
	import EditorMenu from './EditorMenu.svelte';

	let containerRef: Node;
	let editor: EditorStore;

	onMount(() => {
		editor = createEditor(containerRef);
		return () => $editor.view.destroy();
	});
</script>

<div>
	{#if editor}
		<EditorMenu {editor} />
	{/if}
	<!-- where prosemirror will attach itself -->
	<div bind:this={containerRef} />
</div>

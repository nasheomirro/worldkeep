<script lang="ts">
	import type { EditorStore } from '.';
	import { schema } from './schema';

	export let editor: EditorStore;

	$: isStrong = $editor && editor.checkMark(schema.marks.strong);
	$: isEm = $editor && editor.checkMark(schema.marks.em);
</script>

<ul>
	<li>
		<button on:click={() => editor.toggleMark(schema.marks.strong)} class:active={isStrong}>
			strong
		</button>
	</li>
	<li>
		<button on:click={() => editor.toggleMark(schema.marks.em)} class:active={isEm}>
			em
		</button>
	</li>
</ul>

<style>
	.active {
		background-color: goldenrod;
	}
</style>

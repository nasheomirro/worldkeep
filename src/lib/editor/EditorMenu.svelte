<script lang="ts">
	import { toggleMark } from 'prosemirror-commands';
	import type { EditorStore } from '.';
	import { schema } from './schema';
	import { getAllActiveMarkTypes } from './utils';

	export let editor: EditorStore;

	$: console.log($editor.view);
	$: activeMarks = getAllActiveMarkTypes($editor.view);

	$: isStrong = activeMarks?.find((type) => type === schema.marks.strong);
	$: isEm = activeMarks?.find((type) => type === schema.marks.em);

	const toggleStrong = toggleMark(schema.marks.strong);
	const toggleEm = toggleMark(schema.marks.em);
</script>

<ul>
	<li>
		<button on:click={() => editor.dispatchCommand(toggleStrong)} class:active={isStrong}>
			strong
		</button>
	</li>
	<li>
		<button on:click={() => editor.dispatchCommand(toggleEm)} class:active={isEm}> em </button>
	</li>
</ul>

<style>
	.active {
		background-color: goldenrod;
	}
</style>

<script lang="ts">
	import { toggleMark } from 'prosemirror-commands';
	import { getAllActiveMarkTypes } from './utils';
	import { schema } from './schema';
	import type { ProseEditor } from './types';

	export let editor: ProseEditor;

	$: activeMarks = getAllActiveMarkTypes(editor.state);
	$: isStrong = activeMarks.find((type) => type === schema.marks.strong);
	$: isEm = activeMarks.find((type) => type === schema.marks.em);

	const toggleStrong = toggleMark(schema.marks.strong);
	const toggleEm = toggleMark(schema.marks.em);
</script>

<ul>
	<li>
		<button on:click={() => editor.command(toggleStrong)} class:active={isStrong}> strong </button>
	</li>
	<li>
		<button on:click={() => editor.command(toggleEm)} class:active={isEm}> em </button>
	</li>
</ul>

<style>
	.active {
		background-color: goldenrod;
	}
</style>

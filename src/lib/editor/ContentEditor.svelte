<!-- The wrapper for ProseMirror -->
<script lang="ts">
	import { schema } from './schema';
	import { EditorState, type Transaction } from 'prosemirror-state';
	import { baseKeymap, toggleMark } from 'prosemirror-commands';
	import { history, redo, undo } from 'prosemirror-history';
	import { keymap } from 'prosemirror-keymap';
	import { EditorView } from 'prosemirror-view';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { ProseEditor } from './types';
	import { Node as EditorNode } from 'prosemirror-model';

	export let documentObject: object | undefined = undefined;

	let editorContainer: Node;
	let editor: ProseEditor;

	const dispatchEvent = createEventDispatcher<{
		save: object;
	}>();

	// TODO: implement debouncing for implicit saves, for explicit saves dispatch immediately.
	const dispatchSave = (document: EditorNode) => {
		const content = document.toJSON();
		dispatchEvent('save', content);
	};

	// once mounted, we're able to then mount the ProseMirror
	// Editor which we could then create the wrapper for.
	onMount(() => {
		let state = EditorState.create({
			schema,
			doc: documentObject ? EditorNode.fromJSON(schema, documentObject) : undefined,
			plugins: [
				keymap(baseKeymap),
				keymap({
					'Mod-b': toggleMark(schema.marks.strong),
					'Mod-i': toggleMark(schema.marks.em),
					'Mod-s': (state) => {
						dispatchSave(state.doc);
						return true;
					}
				}),
				history(),
				keymap({ 'Mod-z': undo, 'Mod-y': redo })
			]
		});

		let view = new EditorView(editorContainer, {
			state,
			dispatchTransaction(tr: Transaction) {
				let newState = view.state.apply(tr);
				editor = { ...editor, state: newState };
				view.updateState(newState);
			}
		});

		editor = {
			state,
			command(comm, shouldDispatch = true) {
				const dispatch = shouldDispatch ? view.dispatch : undefined;
				return comm(view.state, dispatch, view);
			}
		};

		return () => view.destroy();
	});
</script>

<div>
	<!-- only show slot when editor is ready -->
	{#if editor}
		<slot {editor} />
	{/if}

	<!-- the element to contain the created ProseMirror Editor -->
	<div bind:this={editorContainer} />
</div>

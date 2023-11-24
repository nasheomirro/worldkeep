<!-- The wrapper for ProseMirror -->
<script lang="ts">
	import { schema } from './schema';
	import { EditorState, type Transaction } from 'prosemirror-state';
	import { baseKeymap, toggleMark } from 'prosemirror-commands';
	import { history, redo, undo } from 'prosemirror-history';
	import { keymap } from 'prosemirror-keymap';
	import { EditorView } from 'prosemirror-view';
	import {  onMount } from 'svelte';
	import type { ProseEditor } from './types';
	import { Node as EditorNode } from 'prosemirror-model';
	import type { WorldDocument } from '$stores/types';
	import { updateDocumentWithRootNode } from './utils';
	import { toggleHeading } from './commands';

	/**
	 * The initial document note to read content from,
	 * note that there is no binding going on with `document`, it is just used as initial value.
	 */
	export let document: WorldDocument;
	export let onsave: (document: WorldDocument) => void;

	let editorContainer: Node;
	let editor: ProseEditor;


	// TODO: implement debouncing for implicit saves, for explicit saves dispatch immediately.
	const updateDocument = (rootNode: EditorNode) => {
		const updatedDocument = updateDocumentWithRootNode(document, rootNode);
		onsave(updatedDocument);
	};

	// once mounted, we're able to then mount the ProseMirror
	// Editor which we could then create the wrapper for.
	onMount(() => {
		let state = EditorState.create({
			schema,
			doc: document?.content ? EditorNode.fromJSON(schema, document.content) : undefined,
			plugins: [
				keymap(baseKeymap),
				keymap({
					'Mod-b': toggleMark(schema.marks.strong),
					'Mod-i': toggleMark(schema.marks.em),
					'Mod-s': (state) => {
						updateDocument(state.doc);
						return true;
					},
					'Mod-shift-1': toggleHeading(1),
					'Mod-shift-2': toggleHeading(2),
					'Mod-shift-3': toggleHeading(3),
					'Mod-shift-4': toggleHeading(4),
					'Mod-shift-5': toggleHeading(5),
					'Mod-shift-6': toggleHeading(6)
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
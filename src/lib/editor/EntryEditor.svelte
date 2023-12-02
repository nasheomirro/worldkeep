<!-- The wrapper for ProseMirror -->
<script lang="ts">
	import { schema } from './schema';
	import { EditorState, type Transaction } from 'prosemirror-state';
	import { baseKeymap, toggleMark } from 'prosemirror-commands';
	import { history, redo, undo } from 'prosemirror-history';
	import { keymap } from 'prosemirror-keymap';
	import { EditorView } from 'prosemirror-view';
	import { onMount, type Snippet } from 'svelte';
	import type { ProseEditor } from './editor.types';
	import { Node as EditorNode } from 'prosemirror-model';
	import type { EditableEntry } from '$stores/types';
	import { updateEntryWithRootNode } from './editor.utils';
	import { toggleHeading } from './commands';

	type Props = {
		/**
		 * The initial document note to read content from,
		 * note that there is no binding going on with `entry`, it is just used as initial value.
		 */
		entry: EditableEntry;
		onsave: (entry: EditableEntry) => void;
		children: Snippet<ProseEditor>;
	};

	const { entry, onsave, children } = $props<Props>();

	let editor = $state<ProseEditor>();
	let editorContainer: Node;

	// TODO: implement debouncing for implicit saves, for explicit saves dispatch immediately.
	const updateEntry = (rootNode: EditorNode) => {
		const updatedEntry = updateEntryWithRootNode(entry, rootNode);
		onsave(updatedEntry);
	};

	// once mounted, we're able to then mount the ProseMirror
	// Editor which we could then create the wrapper for.
	onMount(() => {
		let state = EditorState.create({
			schema,
			doc: entry?.content ? EditorNode.fromJSON(schema, entry.content) : undefined,
			plugins: [
				keymap(baseKeymap),
				keymap({
					'Mod-b': toggleMark(schema.marks.strong),
					'Mod-i': toggleMark(schema.marks.em),
					'Mod-s': (state) => {
						updateEntry(state.doc);
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
				// redundant but typescript will complain
				if (editor) {
					editor = { ...editor, state: newState };
				}
				view.updateState(newState);
			}
		});

		editor = {
			state,
			saveEntry() {
				updateEntry(view.state.doc);
			},
			command(comm, shouldDispatch = true) {
				const dispatch = shouldDispatch ? view.dispatch : undefined;
				return comm(view.state, dispatch, view);
			}
		};

		return () => view.destroy();
	});
</script>

<div>
	<!-- only render children when editor is ready -->
	{#if editor}
		{@render children(editor)}
	{/if}

	<!-- the element to contain the created ProseMirror Editor -->
	<div bind:this={editorContainer} />
</div>

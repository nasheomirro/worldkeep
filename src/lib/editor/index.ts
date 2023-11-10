import { baseKeymap, toggleMark as _toggleMark } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { EditorState, Transaction, type Command } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { writable } from 'svelte/store';
import { schema } from './schema';
import { Node as EditorNode } from 'prosemirror-model';
import { history, redo, undo } from 'prosemirror-history';

export type EditorStore = ReturnType<typeof createEditor>;

export type EditorStoreState = {
	state: EditorState;
	view: EditorView;
};

/**
 * Returns a store that serves as a svelte wrapper for ProseMirror.
 */
export function createEditor(container: Node, content?: object) {
	let state = EditorState.create({
		schema,
		doc: content ? EditorNode.fromJSON(schema, content) : undefined,
		plugins: [
			keymap(baseKeymap),
			keymap({
				'Mod-b': _toggleMark(schema.marks.strong),
				'Mod-i': _toggleMark(schema.marks.em)
			}),
			history(),
			keymap({ 'Mod-z': undo, 'Mod-y': redo })
		]
	});

	let store = writable<EditorStoreState>();

	let view = new EditorView(container, {
		state,
		dispatchTransaction(tr: Transaction) {
			let newState = view.state.apply(tr);
			store.set({ state, view });
			view.updateState(newState);
		}
	});

	store.set({ state, view });

	return {
		subscribe: store.subscribe,
		dispatchCommand: (command: Command) => {
			command(view.state, view.dispatch);
		}
	};
}

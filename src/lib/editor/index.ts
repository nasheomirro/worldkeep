import { baseKeymap, toggleMark as _toggleMark } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { writable } from 'svelte/store';
import { schema } from './schema';
import { Node as EditorNode, Mark, MarkType } from 'prosemirror-model';

export type EditorStore = ReturnType<typeof createEditor>;

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
			})
		]
	});

	let store = writable(state);

	// attach dispatch cycle to svelte's reactivity through our store
	let view = new EditorView(container, {
		state,
		dispatchTransaction(tr) {
			let newState = view.state.apply(tr);
			store.set(newState);
			view.updateState(newState);
		}
	});

	/** check if given mark type is active in the current selection */
	function checkMark(markType: MarkType) {
		let isEmpty = view.state.selection.empty;
		let state = view.state;

		const findMark = (mark: Mark) => mark.type === markType;

		if (isEmpty) {
			let $from = state.selection.$from;
			let storedMarks = state.storedMarks;
			// note that stored marks don't mean active marks
			if (storedMarks) {
				console.log(storedMarks.map((mark) => mark.type.name));
				return storedMarks?.find(findMark);
			} else {
				return $from.marks().find(findMark);
			}
		} else {
			// get all applied marks in selected content.
			let isFound = false;
			let slice = view.state.selection.content();
			slice.content.descendants((node) => {
				isFound = isFound || Boolean(node.marks.find(findMark));
			});

			return isFound;
		}
	}

	/** toggle mark in the current selection, if selection is empty, toggle it as an active mark instead. */
	function toggleMark(markType: MarkType) {
		_toggleMark(markType)(view.state, view.dispatch);
	}

	function destroy() {
		view.destroy();
	}

	return {
		subscribe: store.subscribe,
		checkMark,
		toggleMark,
		destroy
	};
}

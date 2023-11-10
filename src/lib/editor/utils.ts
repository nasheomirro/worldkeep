import { toggleMark as _toggleMark } from 'prosemirror-commands';
import type { Mark, MarkType } from 'prosemirror-model';
import type { EditorView } from 'prosemirror-view';

/**
 * gets all active marks in the current selection.
 * Or if selection is empty, then all the stored (toggled) marks
 */
export function getAllActiveMarkTypes(view: EditorView) {
	let state = view.state;
	let selectionEmpty = view.state.selection.empty;

	const getMarkType = (mark: Mark) => mark.type;

	if (selectionEmpty) {
		let storedMarks = state.storedMarks;
		let resolvedFrom = state.selection.$anchor;

		return storedMarks ? storedMarks.map(getMarkType) : resolvedFrom.marks().map(getMarkType);
	}

	if (!selectionEmpty) {
		let slice = view.state.selection.content();

		const activeMarkTypes = new Set();

		slice.content.descendants((node) => {
			node.marks.forEach((mark) => activeMarkTypes.add(mark.type));
		});

		return Array.from(activeMarkTypes);
	}
}
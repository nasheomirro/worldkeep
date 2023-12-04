import type { EditableEntry, WorldDocument } from '$lib/app/types';
import { toggleMark as _toggleMark } from 'prosemirror-commands';
import type { Mark, MarkType, Node as EditorNode } from 'prosemirror-model';
import type { EditorState } from 'prosemirror-state';

/**
 * gets all active marks in the current selection.
 * Or if selection is empty, then all the stored (toggled) marks
 */
export function getAllActiveMarkTypes(state: EditorState) {
	const getMarkType = (mark: Mark) => mark.type;

	let selectionEmpty = state.selection.empty;

	if (selectionEmpty) {
		let storedMarks = state.storedMarks;
		let resolvedFrom = state.selection.$from;
		return storedMarks ? storedMarks.map(getMarkType) : resolvedFrom.marks().map(getMarkType);
	} else {
		let slice = state.selection.content();

		const activeMarkTypes = new Set<MarkType>();

		slice.content.descendants((node) => {
			node.marks.forEach((mark) => activeMarkTypes.add(mark.type));
		});

		return Array.from(activeMarkTypes);
	}
}

export function updateEntryWithRootNode(oldEntry: EditableEntry, doc: EditorNode): EditableEntry {
	// this works in the presumption that the schema will always have a heading
	const content = doc.toJSON();
	const title = doc.firstChild?.textContent || '';
	const updatedAt = new Date().toUTCString();

	let description = doc.maybeChild(1)?.textContent || '';

	if (description.length > 200) {
		let slice = description.slice(0, 197);
		slice += '...';
		description = slice;
	}

	return {
		...oldEntry,
		content,
		title,
		description,
		updatedAt
	};
}

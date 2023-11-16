import type { WorldDocument } from '$lib/app/types';
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

export function updateDocumentWithRootNode(oldNote: WorldDocument, doc: EditorNode): WorldDocument {
	const content = doc.toJSON();
	const title = doc.firstChild?.textContent || '';
	const description = doc.maybeChild(1)?.textContent || '';
	const updatedAt = new Date().toUTCString();

	return {
		...oldNote,
		content,
		title,
		description,
		updatedAt
	};
}

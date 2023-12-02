import { createTagObject } from '$stores/utils';
import { get } from 'svelte/store';
import type { ActionParams } from '.';

/** actions that manipulate multiple stores. */
export function createCombinedActions({ documents, tags, db }: ActionParams) {
	return {
		createTagAndAttachToDocument
	};

	/**
	 * creates a tag and attaches it to the document in one DB transaction,
	 * making sure that the outcome is either both success or both fail.
	 */
	async function createTagAndAttachToDocument(tagName: string, documentId: string) {
		const documentValues = get(documents);
		const oldDocument = documentValues.find((document) => document.id === documentId);

		if (oldDocument) {
			const newTag = createTagObject(tagName);
			const newDocument = { ...oldDocument, tags: [...oldDocument.tags, newTag.id] };

			const tr = db.transaction(['documents', 'tags'], 'readwrite');
			await Promise.all([
				tr.objectStore('tags').add(newTag),
				tr.objectStore('documents').put(newDocument),
				tr.done
			]);

			documents.update((documents) =>
				documents.map((document) => {
					let isMatched = document.id === newDocument.id;
					return isMatched ? newDocument : document;
				})
			);

			tags.update((tags) => [...tags, newTag]);
		}
	}
}

import { _documentActions, documentStore } from './documents';
import { _worldDataActions, worldDataStore } from './worlds';
import { _documentTagActions, documentTagStore } from './tags';
import { createTag, updateDocumentWith } from './utils';
import { get } from 'svelte/store';

/**
 * holds all the actions that components can use, these actions are functions
 * that updates the global stores which by extension updates the current
 * world database as well as the world-data database. ***These should be the
 * only way that components will modify stores.***
 */
export const actions = {
	..._documentActions,
	..._documentTagActions,
	..._worldDataActions,
	createTagAndAttachToDocument
};

/**
 * creates a tag and attaches it to the document in one DB transaction,
 * making sure that the outcome is either both success or both fail.
 */
async function createTagAndAttachToDocument(tagName: string, documentId: string) {
	const documents = get(documentStore);
	const matchedDocument = documents.find((document) => document.id === documentId);

	if (matchedDocument) {
		const newTag = createTag(tagName);
		const updatedDocument = updateDocumentWith(matchedDocument, {
			tags: matchedDocument.tags.includes(newTag.id)
				? matchedDocument.tags
				: [...matchedDocument.tags, newTag.id]
		});

		await worldDataStore.db((db) => {
			const tr = db.transaction(['documents', 'tags'], 'readwrite');
			return Promise.all([
				tr.objectStore('tags').add(newTag),
				tr.objectStore('documents').put(updatedDocument),
				tr.done
			]);
		});

		documentStore._update((documents) =>
			documents.map((document) => {
				let isMatched = document.id === updatedDocument.id;
				return isMatched ? updatedDocument : document;
			})
		);

		documentTagStore._update((tags) => [...tags, newTag]);
	}
}

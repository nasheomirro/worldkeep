import { writable } from 'svelte/store';
import type { DocumentNote, DocumentStore } from './types';
import { worldDataStore } from './worlds';
import { nanoid } from 'nanoid';

const _store = writable<DocumentStore>([]);

/** holds the current documents for the current world */
export const documentStore = {
	subscribe: _store.subscribe,
	intialize,
	/** the store's update method. **Do not use inside components, use actions instead. ** */
	_update: _store.update
};

export const _documentActions = {
	createDocument,
	updateDocument,
	deleteDocument
};

/**
 * makes document subscribe to world changes.
 * **It is important that this is called before anything else!**
 */
function intialize() {
	worldDataStore.subscribeToWorldChange('documents', async (db) => {
		const documents = await db.getAll('documents');
		_store.set(documents);
	});
}

/** creates an empty document. */
async function createDocument() {
	const dateNowString = new Date().toUTCString();

	const emptyDoc: DocumentNote = {
		title: '',
		description: '',
		tags: [],
		createdAt: dateNowString,
		updatedAt: dateNowString,
		content: undefined,
		id: nanoid(12)
	};

	await worldDataStore.db((db) => db.put('documents', emptyDoc));
	_store.update((documents) => [...documents, emptyDoc]);
}

/** updates the `store` with the given document. */
async function updateDocument(updatedDocument: DocumentNote) {
	await worldDataStore.db((db) => db.put('documents', updatedDocument));

	_store.update((documents) =>
		documents.map((document) => {
			let isMatched = document.id === updatedDocument.id;
			return isMatched ? updatedDocument : document;
		})
	);
}

/** deletes the document with the given `id`. */
async function deleteDocument(id: string) {
	await worldDataStore.db((db) => db.delete('documents', id));

	_store.update((documents) =>
		documents.filter((document) => {
			return document.id !== id;
		})
	);
}

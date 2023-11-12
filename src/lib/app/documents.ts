import { writable } from 'svelte/store';
import type { DocumentNote } from './types';
import { openWorldDB } from './storage';

// LONG TODO: Eventually we will create multiple DBs so this needs to be replaced with
// some kind of way for the wrapper to switch to the next opened DB.
const db = await openWorldDB();

// all transactions and updates to the DB will be through the store, so no need to keep
// getting documents from the DB.
const initialDocuments = await db.getAll('documents');

/** the `store` will act as a `reactive` wrapper around the db. */
const store = writable<DocumentNote[]>(initialDocuments);

/** creates an empty document given an `id`. */
function createDocument(id: string) {
	const dateNowString = new Date().toUTCString();

	const emptyDoc: DocumentNote = {
		title: '',
		description: '',
		createdAt: dateNowString,
		updatedAt: dateNowString,
		content: undefined,
		id
	};

	db.put('documents', emptyDoc);

	store.update((documents) => [...documents, emptyDoc]);
}

/** updates the `store` with the given document. */
function updateDocument(updatedDocument: DocumentNote) {
	db.put('documents', updatedDocument);

	store.update((documents) =>
		documents.map((document) => {
			let isMatched = document.id === updatedDocument.id;
			return isMatched ? updatedDocument : document;
		})
	);
}

/** deletes the document with the given `id`. */
function deleteDocument(id: string) {
	db.delete('documents', id);

	store.update((documents) =>
		documents.filter((document) => {
			return document.id !== id;
		})
	);
}

/** the `document` store. It serves as a reactive wrapper for the `IDBDatabase`. */
export const documents = {
	subscribe: store.subscribe,
	createDocument,
	updateDocument,
	deleteDocument
};

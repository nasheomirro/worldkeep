import { writable } from 'svelte/store';
import type { DocumentNote } from './types';
import { createWorldDataStore } from './storage';

const worldDataStore = await createWorldDataStore();

/** the `store` will act as a `reactive` wrapper around the db. */
const documentStore = writable<DocumentNote[]>([]);

async function setWorldTo(id: string) {
	const wasFoundAndOpened = await worldDataStore.setCurrentWorld(id);
	if (wasFoundAndOpened) {
		return await worldDataStore.usedb(async (db) => {
			const documents = await db.getAll('documents');
			documentStore.set(documents);
			return true;
		});
	}

	return false;
}

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

	worldDataStore.usedb((db) => db.put('documents', emptyDoc));
	documentStore.update((documents) => [...documents, emptyDoc]);
}

/** updates the `store` with the given document. */
function updateDocument(updatedDocument: DocumentNote) {
	worldDataStore.usedb((db) => db.put('documents', updatedDocument));

	documentStore.update((documents) =>
		documents.map((document) => {
			let isMatched = document.id === updatedDocument.id;
			return isMatched ? updatedDocument : document;
		})
	);
}

/** deletes the document with the given `id`. */
function deleteDocument(id: string) {
	worldDataStore.usedb((db) => db.delete('documents', id));

	documentStore.update((documents) =>
		documents.filter((document) => {
			return document.id !== id;
		})
	);
}

export const worlds = {
	subscribe: worldDataStore.subscribe,
	/** creates world record, note that it doesn't open the `db` yet. */
	createWorld: worldDataStore.createWorldData,
	/** deletes world record and associated `db`. */
	deleteWorld: worldDataStore.deleteWorldData,
	/** closes any connections open to the `db` and sets `currentId` to null. */
	closeWorld: worldDataStore.closeCurrentWorld,
	/**
	 * sets current `db` connection to one with `id`. If a connection is opened,
	 * the opened `db` will try to populate `documents` with the world's documents.
	 * Will return true if the operation is successful.
	 */
	setWorldTo
};

/** the `document` store. It serves as a reactive wrapper for the `IDBDatabase`. */
export const documents = {
	subscribe: documentStore.subscribe,
	createDocument,
	updateDocument,
	deleteDocument
};

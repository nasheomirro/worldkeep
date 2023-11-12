import { writable } from 'svelte/store';
import type { DocumentNote } from './types';

const store = writable<DocumentNote[]>([]);

function createDocument(id: string) {
	const emptyDoc: DocumentNote = {
		title: '',
		createdAt: '',
		updatedAt: '',
		description: '',
		content: undefined,
		id
	};

	store.update((documents) => [...documents, emptyDoc]);
}

function updateDocument(updatedDocument: DocumentNote) {
	store.update((documents) =>
		documents.map((document) => {
			let isMatched = document.id === updatedDocument.id;
			return isMatched ? updatedDocument : document;
		})
	);
}

function deleteDocument(id: string) {
	store.update((documents) =>
		documents.filter((document) => {
			return document.id !== id;
		})
	);
}


export const documents = {
	subscribe: store.subscribe,
	createDocument,
	updateDocument,
	deleteDocument
};

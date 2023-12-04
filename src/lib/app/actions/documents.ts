import type { WorldDocument } from '$stores/app.types';
import { nanoid } from 'nanoid';
import type { ActionParams } from '.';
import { get } from 'svelte/store';

/** actions that exclusively manipulates the document store */
export function createDocumentActions({ documents, db }: ActionParams) {
	return {
		createDocument,
		deleteDocument,
		updateDocument
	};

	async function createDocument() {
		const dateNowString = new Date().toUTCString();

		const emptyDoc: WorldDocument = {
			title: '',
			description: '',
			tags: [],
			createdAt: dateNowString,
			updatedAt: dateNowString,
			content: undefined,
			id: nanoid(12)
		};

		await db.put('documents', emptyDoc);
		documents.update((documents) => [...documents, emptyDoc]);
	}

	/** deletes the document with the given `id`. */
	async function deleteDocument(id: string) {
		await db.delete('documents', id);

		documents.update((documents) =>
			documents.filter((document) => {
				return document.id !== id;
			})
		);
	}

	/** overrides the specified `document` with the passed `updates`. */
	async function updateDocument(id: string, updates: Partial<Omit<WorldDocument, 'id'>>) {
		const oldDocument = get(documents).find((document) => document.id === id);
		if (oldDocument) {
			const newDocument = { ...oldDocument, ...updates };
			await db.put('documents', newDocument);

			documents.update((documents) =>
				documents.map((document) => {
					let isMatched = document.id === newDocument.id;
					return isMatched ? newDocument : document;
				})
			);
		}
	}
}

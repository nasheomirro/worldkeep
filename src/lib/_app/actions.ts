import { get, type Writable } from 'svelte/store';
import type { WorldDB, WorldDocument, WorldTag } from './types';
import type { IDBPDatabase } from 'idb';
import { nanoid } from 'nanoid';
import { createTag as _createTag } from './utils';

/**
 * holds all the functions that components can use to manipulate the world database.
 */
export class WorldActions {
	#documents: Writable<WorldDocument[]>;
	#tags: Writable<WorldTag[]>;
	#db: IDBPDatabase<WorldDB>;

	constructor(
		documents: Writable<WorldDocument[]>,
		tags: Writable<WorldTag[]>,
		connection: IDBPDatabase<WorldDB>
	) {
		this.#documents = documents;
		this.#tags = tags;
		this.#db = connection;
	}

	/** creates an empty document. */
	async createDocument() {
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

		await this.#db.put('documents', emptyDoc);
		this.#documents.update((documents) => [...documents, emptyDoc]);
	}
	/** deletes the document with the given `id`. */
	async deleteDocument(id: string) {
		await this.#db.delete('documents', id);

		this.#documents.update((documents) =>
			documents.filter((document) => {
				return document.id !== id;
			})
		);
	}

	/** overrides the specified `document` with the passed `updates`. */
	async updateDocument(id: string, updates: Partial<Omit<WorldDocument, 'id'>>) {
		const oldDocument = get(this.#documents).find((document) => document.id === id);
		if (oldDocument) {
			const newDocument = { ...oldDocument, ...updates };
			await this.#db.put('documents', newDocument);

			this.#documents.update((documents) =>
				documents.map((document) => {
					let isMatched = document.id === newDocument.id;
					return isMatched ? newDocument : document;
				})
			);
		}
	}

	/** creates a tag. */
	async createTag(name: string) {
		const newTag: WorldTag = _createTag(name);

		await this.#db.add('tags', newTag);
		this.#tags.update((tags) => [...tags, newTag]);
	}

	/** deletes the specified tag. */
	async deleteTag(id: string) {
		await this.#db.delete('tags', id);
		this.#tags.update((tags) => tags.filter((tag) => tag.id !== id));
	}

	/** overrides the specified `tag` with the passed `updates`. */
	async updateTag(id: string, updates: Partial<Omit<WorldTag, 'id'>>) {
		const oldTag = get(this.#tags).find((tag) => tag.id === id);
		if (oldTag) {
			const newTag = { ...oldTag, ...updates };
			await this.#db.put('tags', newTag);

			this.#tags.update((tags) =>
				tags.map((tag) => {
					let isMatched = tag.id === newTag.id;
					return isMatched ? newTag : tag;
				})
			);
		}
	}

	/**
	 * creates a tag and attaches it to the document in one DB transaction,
	 * making sure that the outcome is either both success or both fail.
	 */
	async createTagAndAttachToDocument(tagName: string, documentId: string) {
		const documents = get(this.#documents);
		const oldDocument = documents.find((document) => document.id === documentId);

		if (oldDocument) {
			const newTag = _createTag(tagName);
			const newDocument = { ...oldDocument, tags: [...oldDocument.tags, newTag.id] };

			const tr = this.#db.transaction(['documents', 'tags'], 'readwrite');
			await Promise.all([
				tr.objectStore('tags').add(newTag),
				tr.objectStore('documents').put(newDocument),
				tr.done
			]);

			this.#documents.update((documents) =>
				documents.map((document) => {
					let isMatched = document.id === newDocument.id;
					return isMatched ? newDocument : document;
				})
			);

			this.#tags.update((tags) => [...tags, newTag]);
		}
	}
}

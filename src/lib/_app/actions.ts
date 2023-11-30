import { get, type Writable } from 'svelte/store';
import type { WorldDB, WorldDocument, WorldElement, WorldTag } from './types';
import type { IDBPDatabase } from 'idb';
import { nanoid } from 'nanoid';
import { createTag as _createTag } from './utils';

/**
 * holds all the functions that components can use to manipulate the world database.
 */
export class WorldActions {
	#documents: Writable<WorldDocument[]>;
	#tags: Writable<WorldTag[]>;
	#elements: Writable<WorldElement[]>;
	#db: IDBPDatabase<WorldDB>;

	constructor(
		documents: Writable<WorldDocument[]>,
		tags: Writable<WorldTag[]>,
		elements: Writable<WorldElement[]>,
		connection: IDBPDatabase<WorldDB>
	) {
		this.#documents = documents;
		this.#tags = tags;
		this.#elements = elements;
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

	/** creates an empty document. */
	async createElement() {
		const dateNowString = new Date().toUTCString();

		const emptyElement: WorldElement = {
			title: '',
			description: '',
			tags: [],
			createdAt: dateNowString,
			updatedAt: dateNowString,
			content: undefined,
			id: nanoid(12),
			history: [],
			isElement: true
		};

		await this.#db.put('elements', emptyElement);
		this.#elements.update((elements) => [...elements, emptyElement]);
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

	/** deletes the document with the given `id`. */
	async deleteElement(id: string) {
		await this.#db.delete('elements', id);

		this.#elements.update((elements) =>
			elements.filter((element) => {
				return element.id !== id;
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

	/** overrides the specified `document` with the passed `updates`. */
	async updateElement(id: string, updates: Partial<Omit<WorldElement, 'id'>>) {
		const oldElement = get(this.#elements).find((element) => element.id === id);
		if (oldElement) {
			const newElement = { ...oldElement, ...updates };
			await this.#db.put('elements', newElement);

			this.#elements.update((elements) =>
				elements.map((element) => {
					let isMatched = element.id === newElement.id;
					return isMatched ? newElement : element;
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

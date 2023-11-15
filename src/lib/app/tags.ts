import { writable } from 'svelte/store';
import type { DocumentTag, DocumentTagStore } from './types';
import { worldDataStore } from './worlds';
import { createTag as _createTag } from './utils';

const _store = writable<DocumentTagStore>([]);

export const documentTagStore = {
	subscribe: _store.subscribe,
	createTag: _createTag,
	updateTag,
	deleteTag,
	initialize,
	/** the store's update method. **Do not use inside components, use actions instead. ** */
	_update: _store.update
};

export const _documentTagActions = {
	createTag,
	updateTag,
	deleteTag
};

/**
 * makes tags subscribe to world changes.
 * **It is important that this is called before anything else!**
 */
function initialize() {
	worldDataStore.subscribeToWorldChange('tags', async (db) => {
		const initialTags = await db.getAll('tags');
		_store.set(initialTags);
	});
}

async function createTag(name: string) {
	const newTag: DocumentTag = _createTag(name);

	await worldDataStore.db((db) => db.add('tags', newTag));
	_store.update((tags) => [...tags, newTag]);
}

async function updateTag(updatedTag: DocumentTag) {
	await worldDataStore.db((db) => db.put('tags', updatedTag));

	_store.update((tags) =>
		tags.map((tag) => {
			let isMatched = tag.id === updatedTag.id;
			return isMatched ? updatedTag : tag;
		})
	);
}

async function deleteTag(id: string) {
	await worldDataStore.db((db) => db.delete('tags', id));
	_store.update((tags) => tags.filter((tag) => tag.id !== id));
}

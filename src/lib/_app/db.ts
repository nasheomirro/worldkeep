import { openDB, type OpenDBCallbacks } from 'idb';
import type { WorldDB, WorldMetaDB } from './types';

export function openWorldMetaDB() {
	return openDB<WorldMetaDB>('worldnames', 1, {
		upgrade(db) {
			db.createObjectStore('worlds', { keyPath: 'id' });
		}
	});
}

export function openWorldDB(
	worldId: string,
	options: { blocking: OpenDBCallbacks<WorldDB>['blocking'] }
) {
	return openDB<WorldDB>(worldId, 1, {
		upgrade(db) {
			db.createObjectStore('documents', { keyPath: 'id' });
			db.createObjectStore('tags', { keyPath: 'id' });
			db.createObjectStore('elements', { keyPath: 'id' });
		},
		...options
	});
}

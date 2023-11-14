import { openDB, type OpenDBCallbacks } from 'idb';
import type { WorldDB, WorldDataDB } from './types';

export function openWorldDataDB() {
	return openDB<WorldDataDB>('worldnames', 1, {
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
		},
		...options
	});
}

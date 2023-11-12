import { openDB } from 'idb';
import type { WorldDB } from './types';

export function openWorldDB() {
	return openDB<WorldDB>('world', 1, {
		upgrade(db) {
			db.createObjectStore('documents', { keyPath: 'id' });
		}
	});
}

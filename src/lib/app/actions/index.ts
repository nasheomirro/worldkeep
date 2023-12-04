import type { HistoryItem, WorldDB, WorldDocument, WorldElement, WorldTag } from '$stores/app.types';
import type { IDBPDatabase } from 'idb';
import type { Writable } from 'svelte/store';
import { createDocumentActions } from './documents';
import { createElementActions } from './elements';
import { createTagActions } from './tags';
import { createCombinedActions } from './misc';

export type ActionParams = {
	documents: Writable<WorldDocument[]>;
	tags: Writable<WorldTag[]>;
	elements: Writable<WorldElement[]>;
	history: Writable<HistoryItem[]>;
	db: IDBPDatabase<WorldDB>;
};

export type WorldActions = ReturnType<typeof createActions>;

export function createActions(stores: ActionParams) {
	return {
		...createDocumentActions(stores),
		...createElementActions(stores),
		...createTagActions(stores),
		...createCombinedActions(stores)
	};
}

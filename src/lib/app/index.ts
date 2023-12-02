import { writable, type Readable } from 'svelte/store';
import type {
	WorldTag,
	WorldDocument,
	WorldMetaDB,
	WorldMeta,
	WorldDB,
	WorldElement,
	HistoryItem
} from './types';

import { nanoid } from 'nanoid';
import { getContext, setContext } from 'svelte';
import { openWorldDB, openWorldMetaDB } from './db';
import { deleteDB, type IDBPDatabase } from 'idb';
import { createActions, type WorldActions } from './actions';

const worldListKey = 'world-list';
const worldContextKey = 'world-context';

type WorldContext = {
	actions: WorldActions;
	documents: Readable<WorldDocument[]>;
	elements: Readable<WorldElement[]>;
	tags: Readable<WorldTag[]>;
};

export const getWorldContext = () => getContext<WorldContext>(worldContextKey);
export const setWorldContext = (context: WorldContext) => setContext(worldContextKey, context);

export const getWorldList = () => getContext<WorldList>(worldListKey);
export const setWorldList = (list: WorldList) => setContext(worldListKey, list);

export class WorldList {
	#worlds = writable<WorldMeta[]>([]);
	#worldlist_db: IDBPDatabase<WorldMetaDB>;

	constructor() {
		// i am not gonna try handling `worldlist_db` being either undefined or not.
		this.#worldlist_db = {} as any;
	}

	subscribe = this.#worlds.subscribe;

	/**
	 * gets all world data from db connection and updates internal store.
	 * **This must be called and awaited immediately after creating the instance**!
	 */
	async initialize() {
		this.#worldlist_db = await openWorldMetaDB();
		const worlds = await this.#worldlist_db.getAll('worlds');
		this.#worlds.set(worlds);
	}

	/** creates an empty world data object, note that this doesn't open a DB connection. */
	async createWorldMeta() {
		const emptyWorldMeta: WorldMeta = {
			id: nanoid(8),
			name: '',
			createdAt: new Date(),
			updatedAt: new Date(),
			description: ''
		};

		await this.#worldlist_db.add('worlds', emptyWorldMeta);
		this.#worlds.update((state) => [...state, emptyWorldMeta]);
	}

	/** removes world data from store and deletes the associated database. */
	async deleteWorldMeta(id: string) {
		await deleteDB(id);
		await this.#worldlist_db.delete('worlds', id);
		this.#worlds.update((state) => state.filter((world) => world.id !== id));
	}
}

export class World {
	#world_id: string;
	#world_db: IDBPDatabase<WorldDB>;
	actions: WorldActions;

	#is_closed = writable<boolean>(false);
	#documents = writable<WorldDocument[]>([]);
	#tags = writable<WorldTag[]>([]);
	#elements = writable<WorldElement[]>([]);
	#history = writable<HistoryItem[]>([]);

	constructor(id: string) {
		this.#world_id = id;
		this.#world_db = {} as any;
		this.actions = {} as any;
	}

	/**
	 * gets all data from db connection and updates internal stores.
	 * **This must be immediately called and awaited before using the `World` instance**!
	 */
	async initialize() {
		this.#world_db = await openWorldDB(this.#world_id, {
			blocking: () => {
				this.#world_db.close();
				this.#is_closed.set(true);
			}
		});

		const tr = this.#world_db.transaction(['documents', 'tags', 'elements', 'history'], 'readonly');
		const [documents, tags, elements, history] = await Promise.all([
			tr.objectStore('documents').getAll(),
			tr.objectStore('tags').getAll(),
			tr.objectStore('elements').getAll(),
			tr.objectStore('history').getAll(),
			tr.done
		]);

		this.#documents.set(documents);
		this.#tags.set(tags);
		this.#elements.set(elements);
		this.#history.set(history);

		this.actions = createActions({
			db: this.#world_db,
			documents: this.#documents,
			elements: this.#elements,
			tags: this.#tags,
			history: this.#history
		});
	}

	closeWorld() {
		this.#world_db.close();
	}

	createHistoryStore(): Readable<HistoryItem[]> {
		return {
			subscribe: this.#history.subscribe
		};
	}

	/** returns a subscribe-only store of the internal `documents` store. */
	createDocumentStore(): Readable<WorldDocument[]> {
		return {
			subscribe: this.#documents.subscribe
		};
	}

	/** returns a subscribe-only store of the internal `tags` store. */
	createTagStore(): Readable<WorldTag[]> {
		return {
			subscribe: this.#tags.subscribe
		};
	}

	/** returns a subscribe-only store of the internal `elements` store. */
	createElementStore(): Readable<WorldElement[]> {
		return {
			subscribe: this.#elements.subscribe
		};
	}

	/**
	 * returns a subscribe-only store of the internal `is_closed` store.
	 * when the store is set to true, the connection to the world database has been
	 * closed, either because the connection was blocking a newer version from opening,
	 * or that the database has been deleted.
	 */
	createClosedStore(): Readable<boolean> {
		return {
			subscribe: this.#is_closed.subscribe
		};
	}
}

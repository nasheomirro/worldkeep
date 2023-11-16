import { writable, type Readable } from 'svelte/store';
import type { WorldTag, WorldDocument, WorldDataDB, WorldData, WorldDB } from './types';
import { nanoid } from 'nanoid';
import { WorldActions } from './actions';
import { getContext, setContext } from 'svelte';
import { openWorldDB, openWorldDataDB } from './db';
import type { IDBPDatabase } from 'idb';

const worldListKey = 'world-list';
const documentsKey = 'documents';
const tagsKey = 'tags';
const actionsKey = 'world-actions';

export const getWorldList = () => getContext<WorldList>(worldListKey);
export const setWorldList = (list: WorldList) => setContext(worldListKey, list);

export const getDocuments = () => getContext<Readable<WorldDocument[]>>(documentsKey);
export const setDocuments = (store: Readable<WorldDocument[]>) => setContext(documentsKey, store);

export const getTags = () => getContext<Readable<WorldTag[]>>(tagsKey);
export const setTags = (store: Readable<WorldTag[]>) => setContext(tagsKey, store);

export const getActions = () => getContext<WorldActions>(actionsKey);
export const setActions = (actions: WorldActions) => setContext(actionsKey, actions);

export class WorldList {
	#worlds = writable<WorldData[]>([]);
	#worldlist_db: IDBPDatabase<WorldDataDB>;

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
		this.#worldlist_db = await openWorldDataDB();
		const worlds = await this.#worldlist_db.getAll('worlds');
		this.#worlds.set(worlds);
	}

	/** creates an empty world data object, note that this doesn't open a DB connection. */
	async createWorldData() {
		const emptyWorldData: WorldData = {
			id: nanoid(8),
			name: '',
			createdAt: new Date(),
			updatedAt: new Date()
		};

		await this.#worldlist_db.add('worlds', emptyWorldData);
		this.#worlds.update((state) => [...state, emptyWorldData]);
	}

	/** removes world data from store and deletes the associated database. */
	async deleteWorldData(id: string) {
		this.#worlds.update((state) => state.filter((world) => world.id !== id));
	}
}

export class World {
	#world_id: string;
	#world_db: IDBPDatabase<WorldDB>;

	#is_closed = writable<boolean>(false);
	#documents = writable<WorldDocument[]>([]);
	#tags = writable<WorldTag[]>([]);

	actions: WorldActions;

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
				this.#is_closed.set(true);
			}
		});

		const tr = this.#world_db.transaction(['documents', 'tags'], 'readonly');
		const [documents, tags] = await Promise.all([
			tr.objectStore('documents').getAll(),
			tr.objectStore('tags').getAll(),
			tr.done
		]);

		this.#documents.set(documents);
		this.#tags.set(tags);

		this.actions = new WorldActions(this.#documents, this.#tags, this.#world_db);
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

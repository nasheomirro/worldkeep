import { deleteDB, openDB, type IDBPDatabase } from 'idb';
import { get, writable } from 'svelte/store';
import type { WorldDB, WorldDataStore, WorldDataDB, WorldData } from './types';

/**
 * the reference that holds the current database connection, it doesn't need to be reactive
 * but it still is pretty "unsafe" when it isn't so be cautious.
 */
const _unsafe_currentDb: { db: IDBPDatabase<WorldDB> | undefined } = { db: undefined };

function openWorldDataDB() {
	return openDB<WorldDataDB>('worldnames', 1, {
		upgrade(db) {
			db.createObjectStore('worlds', { keyPath: 'id' });
		}
	});
}

function openWorldDB(worldName: string) {
	return openDB<WorldDB>(worldName, 1, {
		upgrade(db) {
			db.createObjectStore('documents', { keyPath: 'id' });
		},
		blocking: () => {
			_unsafe_currentDb.db?.close();
		}
	});
}

export async function createWorldDataStore() {
	const db = await openWorldDataDB();
	const initialWorldData = await db.getAll('worlds');

	const store = writable<WorldDataStore>({
		currentId: null,
		worlds: initialWorldData
	});

	/** sets `currentId` to the given `id`, returns `true` if successful. */
	async function setCurrentWorld(id: string) {
		const { worlds } = get(store);
		if (worlds.find((world) => world.id === id)) {
			try {
				const db = await openWorldDB(id);

				_unsafe_currentDb.db = db;

				store.update((state) => ({ ...state, currentId: id }));

				return true;
			} catch {}
		}
	}

	/** closes current `db` connection if there are any, and sets `currentId` to `null`. */
	async function closeCurrentWorld() {
		_unsafe_currentDb.db?.close();
		store.update((state) => ({ ...state, currentId: null }));
	}

	/** removes world data from store and deletes the associated database. */
	async function deleteWorldData(id: string) {
		let { worlds, currentId } = get(store);
		if (currentId === id) {
			currentId = null;
			_unsafe_currentDb.db?.close();
			_unsafe_currentDb.db = undefined;
		}

		await deleteDB(id);

		store.update(() => ({
			currentId: currentId,
			worlds: worlds.filter((world) => world.id !== id)
		}));
	}

	/** creates an empty world data object, note that this doesn't open a DB connection. */
	async function createWorldData(id: string) {
		const emptyWorldData: WorldData = {
			id,
			name: '',
			createdAt: new Date(),
			updatedAt: new Date()
		};

		await db.add('worlds', emptyWorldData);
		store.update((state) => ({ ...state, worlds: [emptyWorldData, ...state.worlds] }));
	}

	/**
	 * use `usedb` to "safely" use the currently opened db connection,
	 * the `callback` won't be called if a connection isn't made. this function will return
	 * whatever the `callback` function returns if a connection exists.
	 */
	function usedb<T>(callback: (db: IDBPDatabase<WorldDB>) => T): T | undefined {
		if (_unsafe_currentDb.db) {
			return callback(_unsafe_currentDb.db);
		}
	}

	return {
		subscribe: store.subscribe,
		setCurrentWorld,
		createWorldData,
		deleteWorldData,
		closeCurrentWorld,
		usedb
	};
}

import { deleteDB, type IDBPDatabase } from 'idb';
import { get, writable } from 'svelte/store';
import type { WorldChangeListener, WorldDB, WorldData, WorldDataStore } from './types';
import { openWorldDB, openWorldDataDB } from './db';
import { nanoid } from 'nanoid';

type CurrentDBContainer = { db: IDBPDatabase<WorldDB> | null };

// watch out! non-reactive variables getting mutated!! OH the HUMANITY!
const _important_currentdb: CurrentDBContainer = { db: null };
const _world_change_subscribers = new Map<string, WorldChangeListener>();

const worldsDB = await openWorldDataDB();

const initialWorldData = await worldsDB.getAll('worlds');

const _store = writable<WorldDataStore>({
	currentId: null,
	worlds: initialWorldData
});

export const worldDataStore = {
	subscribe: _store.subscribe,
	db,
	setCurrentWorld,
	closeCurrentWorld,
	subscribeToWorldChange,
	createWorldData,
	deleteWorldData
};

/**
 * "safely" use the currently opened db connection, the `callback` won't be
 * called if a connection isn't made. returns the `callback`'s return value if invoked.
 */
function db<T>(callback: (db: IDBPDatabase<WorldDB>) => T): T | false {
	if (_important_currentdb.db) {
		return callback(_important_currentdb.db);
	}
	return false;
}

/**
 * used by stores to react to a world change. Doesn't fire when world changes to `null`.
 * replace any existing subscriber that has the same `key`.
 */
function subscribeToWorldChange(key: string, onChange: (db: IDBPDatabase<WorldDB>) => void) {
	_world_change_subscribers.set(key, onChange);
}

/**
 * sets `currentId` to the given `id`, returns `true` if successful,
 * else the world with the matching `id` wasn't found.
 */
async function setCurrentWorld(id: string) {
	const { worlds } = get(_store);
	const matchFound = worlds.find((world) => world.id === id);

	if (matchFound) {
		const currentDb = await openWorldDB(id, {
			blocking() {
				_important_currentdb.db?.close();
				_store.update((state) => ({ ...state, currentId: null }));
			}
		});

		_store.update((state) => ({ ...state, currentId: id }));
		_important_currentdb.db = currentDb;
		_world_change_subscribers.forEach((subscriber) => subscriber(currentDb));
	}

	return matchFound;
}

/** closes the current connection to world db and sets `currentId` to null */
async function closeCurrentWorld() {
	_important_currentdb.db?.close();
	_important_currentdb.db = null;
	_store.update((state) => ({ ...state, currentId: null }));
}

/** creates an empty world data object, note that this doesn't open a DB connection. */
async function createWorldData() {
	const emptyWorldData: WorldData = {
		id: nanoid(8),
		name: '',
		createdAt: new Date(),
		updatedAt: new Date()
	};

	await worldsDB.add('worlds', emptyWorldData);
	_store.update((state) => ({ ...state, worlds: [emptyWorldData, ...state.worlds] }));
}

/** removes world data from store and deletes the associated database. */
async function deleteWorldData(id: string) {
	let { worlds, currentId } = get(_store);
	if (currentId === id) {
		currentId = null;
		closeCurrentWorld();
	}

	await deleteDB(id);
	await worldsDB.delete('worlds', id);

	_store.update((state) => ({
		...state,
		worlds: worlds.filter((world) => world.id !== id)
	}));
}

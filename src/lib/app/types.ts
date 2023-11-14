import type { DBSchema, IDBPDatabase } from 'idb';

export type DocumentNote = {
	readonly title: string;
	readonly description: string;
	readonly createdAt: string;
	readonly updatedAt: string;
	readonly content?: object | undefined;
	readonly id: string;
};

export type WorldData = {
	readonly name: string;
	readonly id: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;
};


export type WorldChangeListener = (db: IDBPDatabase<WorldDB>) => void;

export type WorldDataStore = {
	/** the index of the current world being used. */
	currentId: string | null;
	worlds: WorldData[];
};

export interface WorldDataDB extends DBSchema {
	worlds: {
		key: string;
		value: WorldData;
	};
}

export interface WorldDB extends DBSchema {
	documents: {
		key: string;
		value: DocumentNote;
	};
}

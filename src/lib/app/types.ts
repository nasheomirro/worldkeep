import type { DBSchema, IDBPDatabase } from 'idb';

export type DocumentNote = {
	readonly title: string;
	readonly description: string;
	readonly createdAt: string;
	readonly updatedAt: string;
	readonly content?: object | undefined;
	readonly id: string;
	/**
	 * the id of the tags attached to this document.
	 * These are not checked and might not exist.
	 */
	readonly tags: string[];
};

export type DocumentTag = {
	readonly name: string;
	readonly id: string;
};

export type WorldData = {
	readonly name: string;
	readonly id: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;
};

export type WorldDataStore = {
	currentId: string | null;
	worlds: WorldData[];
};

export type DocumentStore = DocumentNote[];

export type DocumentTagStore = DocumentTag[];

export type DBCallback<T = void> = (db: IDBPDatabase<WorldDB>) => T;

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
	tags: {
		key: string;
		value: DocumentTag;
	};
}

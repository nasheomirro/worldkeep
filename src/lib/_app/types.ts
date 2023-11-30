import type { DBSchema, IDBPDatabase } from 'idb';

export type WorldDocument = {
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

export type HistoryItem = {
	readonly name: string;
	readonly description: string;
	/**
	 * the documentId this history item is connected to.
	 * This is not checked and might not exist
	 */
	readonly documentId: string;
};

export type WorldElement = WorldDocument & {
	/**
	 * might look redundant, but its more so to clearly tell
	 * whether an object is an element or a document.
	 */
	isElement?: true;
	readonly history: string[];
};

export type WorldTag = {
	readonly name: string;
	readonly id: string;
};

export type WorldMeta = {
	readonly name: string;
	readonly id: string;
	readonly description: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;
};

export type WorldListState = {
	currentId: string | null;
	worlds: WorldMeta[];
};

export type DocumentTagStore = WorldTag[];

export type DBCallback<T = void> = (db: IDBPDatabase<WorldDB>) => T;

export interface WorldMetaDB extends DBSchema {
	worlds: {
		key: string;
		value: WorldMeta;
	};
}

export interface WorldDB extends DBSchema {
	documents: {
		key: string;
		value: WorldDocument;
	};
	tags: {
		key: string;
		value: WorldTag;
	};
	elements: {
		key: string;
		value: WorldElement;
	};
}

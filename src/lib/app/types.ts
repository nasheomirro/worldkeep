import type { DBSchema, IDBPDatabase } from 'idb';

export interface EditableEntry {
	readonly title: string;
	readonly description: string;
	readonly createdAt: string;
	readonly updatedAt: string;
	readonly content?: object | undefined;
	readonly id: string;
	/**
	 * the id of the tags attached to this document.
	 * These are not checked and might or might not exist.
	 */
	readonly tags: string[];
}

export interface WorldDocument extends EditableEntry {}
export interface WorldElement extends EditableEntry {
	/**
	 * looks redundant, but its more so to clearly tell
	 * whether an object is an element or a document.
	 */
	isElement?: true;
}

export type HistoryItem = {
	readonly name: string;
	readonly description: string;
	readonly id: string;
	/**
	 * the entry id this history item is connected to.
	 * This is not checked and might or might not exist
	 */
	readonly entryId: string;
	/**
	 * the element id this history item is describing.
	 * This is not checked and might or might not exist
	 */
	readonly elementId: string;
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
	history: {
		key: string;
		value: HistoryItem;
	};
}

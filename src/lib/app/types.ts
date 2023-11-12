import type { DBSchema } from 'idb';

export type DocumentNote = {
	readonly title: string;
	readonly description: string;
	readonly createdAt: string;
	readonly updatedAt: string;
	readonly content?: object | undefined;
	readonly id: string;
};

export interface WorldDB extends DBSchema {
	documents: {
		key: string;
		value: DocumentNote;
	};
}

import { nanoid } from 'nanoid';
import type { EditableEntry, WorldDocument, WorldTag } from './app.types';

export function createTagObject(name: string): WorldTag {
	return {
		name,
		id: nanoid(21)
	};
}

export function findEntry<T extends EditableEntry>(entries: T[], id: string): T | undefined {
	return entries.find((entry) => entry.id === id);
}

export function sortDocuments(
	documents: WorldDocument[],
	by: 'recent' | 'alphabetical'
): WorldDocument[] {
	switch (by) {
		case 'recent':
			return [...documents].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
		case 'alphabetical':
			return [...documents].sort();
	}
}

import { nanoid } from 'nanoid';
import type { WorldDocument, WorldTag } from './types';

export function createTag(name: string): WorldTag {
	return {
		name,
		id: nanoid(21)
	};
}

export function findDocument(documents: WorldDocument[], id: string): WorldDocument | undefined {
	return documents.find((note) => note.id === id);
}

export function sortDocuments(
	documents: WorldDocument[],
	by: 'recent' | 'alphabetical'
): WorldDocument[] {
	switch (by) {
		case 'recent':
			return [...documents].sort((a, b) => Date.parse(a.updatedAt) - Date.parse(b.createdAt));
		case 'alphabetical':
			return [...documents].sort();
	}
}

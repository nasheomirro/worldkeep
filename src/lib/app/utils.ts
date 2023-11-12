import type { DocumentNote } from './types';

export function findDocument(documents: DocumentNote[], id: string): DocumentNote | undefined {
	return documents.find((note) => note.id === id);
}

export function sortDocuments(
	documents: DocumentNote[],
	by: 'recent' | 'alphabetical'
): DocumentNote[] {
	switch (by) {
		case 'recent':
			return [...documents].sort((a, b) => Date.parse(a.updatedAt) - Date.parse(b.createdAt));
		case 'alphabetical':
			return [...documents].sort();
	}
}

import { nanoid } from 'nanoid';
import type { DocumentNote, DocumentTag } from './types';

type OverridableFields = Partial<Omit<DocumentNote, 'id'>>;
export function updateDocumentWith(document: DocumentNote, fields: OverridableFields) {
	return {
		...document,
		...fields
	};
}

export function createTag(name: string): DocumentTag {
	return {
		name,
		id: nanoid(21)
	};
}

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

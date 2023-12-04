import type { WorldElement } from '$stores/app.types';
import { nanoid } from 'nanoid';
import type { ActionParams } from '.';
import { get } from 'svelte/store';

/** actions that exclusively manipulates the elements store */
export function createElementActions({ db, elements }: ActionParams) {
	return {
		createElement,
		deleteElement,
		updateElement
	};

	/** creates an empty document. */
	async function createElement() {
		const dateNowString = new Date().toUTCString();

		const emptyElement: WorldElement = {
			title: '',
			description: '',
			tags: [],
			createdAt: dateNowString,
			updatedAt: dateNowString,
			content: undefined,
			id: nanoid(12),
			isElement: true
		};

		await db.put('elements', emptyElement);
		elements.update((elements) => [...elements, emptyElement]);
	}

	/** deletes the document with the given `id`. */
	async function deleteElement(id: string) {
		await db.delete('elements', id);

		elements.update((elements) =>
			elements.filter((element) => {
				return element.id !== id;
			})
		);
	}

	/** overrides the specified `document` with the passed `updates`. */
	async function updateElement(id: string, updates: Partial<Omit<WorldElement, 'id'>>) {
		const oldElement = get(elements).find((element) => element.id === id);
		if (oldElement) {
			const newElement = { ...oldElement, ...updates };
			await db.put('elements', newElement);

			elements.update((elements) =>
				elements.map((element) => {
					let isMatched = element.id === newElement.id;
					return isMatched ? newElement : element;
				})
			);
		}
	}
}

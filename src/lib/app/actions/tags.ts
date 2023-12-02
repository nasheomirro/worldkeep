import type { WorldTag } from '$stores/types';
import { createTagObject } from '$stores/utils';
import { get } from 'svelte/store';
import type { ActionParams } from '.';

/** actions that exclusively manipulates the tags store */
export function createTagActions({ db, tags }: ActionParams) {
	return {
		createTag,
		deleteTag,
		updateTag
	};

	/** creates a tag. */
	async function createTag(name: string) {
		const newTag: WorldTag = createTagObject(name);

		await db.add('tags', newTag);
		tags.update((tags) => [...tags, newTag]);
	}

	/** deletes the specified tag. */
	async function deleteTag(id: string) {
		await db.delete('tags', id);
		tags.update((tags) => tags.filter((tag) => tag.id !== id));
	}

	/** overrides the specified `tag` with the passed `updates`. */
	async function updateTag(id: string, updates: Partial<Omit<WorldTag, 'id'>>) {
		const oldTag = get(tags).find((tag) => tag.id === id);
		if (oldTag) {
			const newTag = { ...oldTag, ...updates };
			await db.put('tags', newTag);

			tags.update((tags) =>
				tags.map((tag) => {
					let isMatched = tag.id === newTag.id;
					return isMatched ? newTag : tag;
				})
			);
		}
	}
}

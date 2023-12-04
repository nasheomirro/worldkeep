import type { HistoryItem } from '$stores/app.types';
import { get } from 'svelte/store';
import type { ActionParams } from '.';

export function createHistoryActions({ history, db }: ActionParams) {
	return {
		createHistoryItem,
		deleteHistoryItem,
		updateHistoryItem
	};

	async function createHistoryItem(item: HistoryItem) {
		await db.add('history', item);
		history.update((items) => [...items, item]);
	}

	/** deletes the history item with the given `id`. */
	async function deleteHistoryItem(id: string) {
		await db.delete('history', id);

		history.update((items) =>
			items.filter((item) => {
				item.id !== id;
			})
		);
	}

	/** overrides the specified `HistoryItem` with the passed `updates`. */
	async function updateHistoryItem(
		id: string,
		updates: Partial<Omit<HistoryItem, 'id' | 'entryId' | 'elementId'>>
	) {
		const oldHistoryItem = get(history).find((item) => item.id === id);
		if (oldHistoryItem) {
			const newHistoryItem = { ...oldHistoryItem, ...updates };

			await db.put('history', newHistoryItem);

			history.update((items) =>
				items.map((item) => {
					let isMatched = item.id === newHistoryItem.id;
					return isMatched ? newHistoryItem : item;
				})
			);
		}
	}
}

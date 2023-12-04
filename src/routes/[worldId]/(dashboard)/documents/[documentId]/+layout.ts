import { findEntry } from '$lib/app/app.utils';
import type { LayoutLoad } from './$types';
import { get } from 'svelte/store';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, parent }) => {
	const { world } = await parent();
	const document = findEntry(get(world.createDocumentStore()), params.documentId);

	if (!document) {
		throw error(404, {
			message: "something went wrong, this document either doesn't exist or is corrupted"
		});
	}

	return {
		documentId: params.documentId
	};
}) satisfies LayoutLoad;

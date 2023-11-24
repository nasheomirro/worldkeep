import { findDocument } from '$stores/utils';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, parent }) => {
	const { world } = await parent();
	const document = findDocument(get(world.createDocumentStore()), params.documentId);

	if (!document) {
		throw error(404, {
			message: "something went wrong, this document either doesn't exist or is corrupted"
		});
	}

	return {
		id: params.documentId
	};
}) satisfies PageLoad;

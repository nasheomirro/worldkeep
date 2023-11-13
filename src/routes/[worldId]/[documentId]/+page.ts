import { findDocument } from '$lib/app/utils';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	// check if the document does exist, if it doesn't then throw an error.
	const { documents } = await import('$lib/app/stores');
	const document = findDocument(get(documents), params.documentId);

	if (!document) {
		throw error(404, {
			message: "something went wrong, this document either doesn't exist or is corrupted"
		});
	}
}) satisfies PageLoad;

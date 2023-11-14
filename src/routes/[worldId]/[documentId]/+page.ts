import { findDocument } from '$lib/app/utils';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, parent }) => {
	// wait for parent to properly load the documents, and then we can check.
	await parent();

	const { documentStore } = await import('$lib/app/documents');
	const document = findDocument(get(documentStore), params.documentId);

	if (!document) {
		throw error(404, {
			message: "something went wrong, this document either doesn't exist or is corrupted"
		});
	}
}) satisfies PageLoad;

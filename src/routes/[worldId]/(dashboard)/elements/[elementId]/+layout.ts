import { findEntry } from '$lib/app/app.utils';
import { get } from 'svelte/store';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { world } = await parent();
	const element = findEntry(get(world.createElementStore()), params.elementId);

	if (!element) {
		throw error(404, {
			message: "something went wrong, this element either doesn't exist or is corrupted"
		});
	}

	return {
		elementId: params.elementId
	};
}) satisfies LayoutLoad;

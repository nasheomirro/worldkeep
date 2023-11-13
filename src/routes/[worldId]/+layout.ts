import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	// if the page is opened directly, SSR won't call load functions
	// but will still import files that were from based imports
	const { worlds } = await import('$lib/app/stores');

	const worldId = params.worldId;
	const isWorldSet = await worlds.setWorldTo(worldId);

	if (!isWorldSet) {
		throw error(404, {
			message: "Something went wrong, either the world is 'corrupted' or it doesn't exist."
		});
	}
}) satisfies PageLoad;

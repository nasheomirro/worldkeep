import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ params, parent }) => {
	// wait for stores to initialize before setting the world.
	await parent();

	const { worldDataStore } = await import('$lib/app/worlds');
	const isWorldSet = await worldDataStore.setCurrentWorld(params.worldId);

	if (!isWorldSet) {
		throw error(404, {
			message: "Something went wrong, either the world is 'corrupted' or it doesn't exist."
		});
	}
}) satisfies LayoutLoad;

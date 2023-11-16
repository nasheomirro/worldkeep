import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { get } from 'svelte/store';
import { World } from '$lib/app';

export const load = (async ({ params, parent }) => {
	const { worldList } = await parent();
	const matchedWorld = get(worldList).find((worlds) => worlds.id === params.worldId);

	if (!matchedWorld) {
		throw error(404, {
			message: "Something went wrong, either the world is 'corrupted' or it doesn't exist."
		});
	}

	const world = new World(matchedWorld.id);
	await world.initialize();
	return { world };
}) satisfies LayoutLoad;

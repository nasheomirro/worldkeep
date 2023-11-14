import type { PageLoad } from './$types';

export const load = (async () => {
	const { worldDataStore } = await import('$lib/app/worlds');
	// since user is in the world menu, close any other world that was opened.
	await worldDataStore.closeCurrentWorld();
}) satisfies PageLoad;

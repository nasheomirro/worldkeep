import type { PageLoad } from './$types';

export const load = (async () => {
	const { worlds } = await import('$lib/app/stores');
	await worlds.closeWorld();
}) satisfies PageLoad;

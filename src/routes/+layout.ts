import { WorldList } from '$lib/app';
import type { LayoutLoad } from './$types';

export const trailingSlash = 'always';
export const ssr = false;

export const load = (async () => {
	const worldList = new WorldList();
	await worldList.initialize();

	return { worldList };
}) satisfies LayoutLoad;

import type { LayoutLoad } from './$types';

export const trailingSlash = 'always';
export const ssr = false;

export const load = (async () => {
	const { documentStore } = await import('$lib/app/documents');
	documentStore.intialize();
}) satisfies LayoutLoad;

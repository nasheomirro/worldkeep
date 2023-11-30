import type { Snippet } from 'svelte';

/** Exclude all `bind:` and `on:` directives from normal element props. */
export type GetProps<
	P = {},
	OP extends Record<string, unknown> = {},
	ExcludeKeys extends keyof P = never
> = Omit<P, `on:${string}` | `bind:${string}` | 'class' | ExcludeKeys | keyof OP> & OP;

export type OptionalChildren = {
	children?: Snippet;
};

export type RequiredChildren = {
	children: Snippet;
};

/**
 * given a base string and an object of string values, "flatten" the `object` into key-value strings
 * then append each key-value string to the base string.
 *
 * Finally, join all combined strings with the `appendTo` string to get one big class name.
 */
export function getClassName(
	base: string,
	modifiers: Record<string, string | boolean>,
	appendTo: string = ''
): string {
	const entries = Object.entries(modifiers);
	const convertedArr = entries.reduce(
		(arr, [key, value]) => {
			if (typeof value === 'string') {
				arr.push(`${base}--${key}-${value}`);
			} else if (value) {
				// if value is a boolean, just append the key instead of `key--boolean`.
				arr.push(`${base}--${key}`);
			}
			return arr;
		},
		[appendTo]
	);

	return convertedArr.join(' ');
}

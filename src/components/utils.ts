export type Merge<A, B> = Omit<A, keyof B> & B;

export type GetProps<
	P,
	ExcludeKeys extends keyof P = never,
	OP extends Record<string, unknown> = {}
> = Omit<P, `on:${string}` | `bind:${string}` | ExcludeKeys | keyof OP> & {
	children?: any;
} & OP;

/**
 * given a base string and an object of string values, "flatten" the `object` into key-value strings
 * then append it to the base string to get one combined class name.
 */
export function className(appendTo: string, modifiers: Record<string, string | boolean>): string {
	const entries = Object.entries(modifiers);
	const convertedArr = entries.reduce(
		(arr, [key, value]) => {
			if (typeof value === 'string') {
				arr.push(`${key}--${value}`);
			} else if (value) {
				// if value is a boolean, just append the key instead of `key--boolean`.
				arr.push(key);
			}
			return arr;
		},
		[appendTo]
	);
	return convertedArr.join(' ');
}

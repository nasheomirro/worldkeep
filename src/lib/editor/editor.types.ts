import type { Command, EditorState } from 'prosemirror-state';

export type ProseEditor = {
	/** the current state of the editor. */
	readonly state: EditorState;
	/** saves the current editor state */
	readonly saveEntry: () => void;
	/**
	 * calls command with the editor's dispatch if `shouldDispatch` is `true`,
	 * else it will just call the command with the dispatch set to `undefined`.
	 * `shouldDispatch` is `true` by default.
	 */
	readonly command: (command: Command, shouldDispatch?: boolean) => boolean;
};

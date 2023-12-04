import { EditorState } from 'prosemirror-state';
import { schema } from './schema';
import type { EditableEntry } from '$stores/app.types';
import { Node } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { toggleHeading } from './commands';
import { history, redo, undo } from 'prosemirror-history';
import { updateEntryWithRootNode } from './editor.utils';

type EditorOptions = {
	onsave?: (entry: EditableEntry) => void;
};

export class EditorDraft<T extends EditableEntry> {
	entry = $state<T>() as T;
	state = $state<EditorState>() as EditorState;
	#onsave: EditorOptions['onsave'];

	constructor(initialEntry: T, options: EditorOptions) {
		this.#onsave = options.onsave;
		this.entry = initialEntry;

		this.state = EditorState.create({
			schema,
			doc: initialEntry?.content ? Node.fromJSON(schema, initialEntry.content) : undefined,
			plugins: [
				keymap(baseKeymap),
				keymap({
					'Mod-b': toggleMark(schema.marks.strong),
					'Mod-i': toggleMark(schema.marks.em),
					'Mod-s': () => {
						this.saveDraft();
						return true;
					},
					'Mod-shift-1': toggleHeading(1),
					'Mod-shift-2': toggleHeading(2),
					'Mod-shift-3': toggleHeading(3),
					'Mod-shift-4': toggleHeading(4),
					'Mod-shift-5': toggleHeading(5),
					'Mod-shift-6': toggleHeading(6)
				}),
				history(),
				keymap({ 'Mod-z': undo, 'Mod-y': redo })
			]
		});
	}

	saveDraft() {
		if (this.#onsave) {
			const entry = updateEntryWithRootNode(this.entry, this.state.doc);
			this.#onsave(entry);
		}
	}
}

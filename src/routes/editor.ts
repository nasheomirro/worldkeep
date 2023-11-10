import { history, undo, redo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView, Decoration, DecorationSet } from 'prosemirror-view';
import { baseKeymap } from 'prosemirror-commands';
import { Schema } from 'prosemirror-model';
import type { NodeSpec, MarkSpec } from 'prosemirror-model';

const pDOM = ['p', 0] as const;
const blockquoteDOM = ['blockquote', 0] as const;

let transactionCounter = new Plugin({
	state: {
		init() {
			return 0;
		},
		apply(tr, value) {
			if (tr.getMeta(transactionCounter)) return value;
			console.log('updated', value + 1);
			return value + 1;
		}
	},
	
});

const nodes: { [key: string]: NodeSpec } = {
	doc: { content: 'heading block+' },
	paragraph: { group: 'block', content: 'text*', toDOM: () => pDOM },
	blockquote: { group: 'block', content: 'block+', toDOM: () => blockquoteDOM },
	heading: {
		group: 'block',
		content: 'text*',
		marks: '',
		attrs: { level: { default: 1 } },
		toDOM: (node) => [`h${node.attrs.level}`, 0]
	},
	text: {}
};

const marks: { [key: string]: MarkSpec } = {
	strong: {},
	em: {}
};

const schema = new Schema({ nodes, marks });

export function createEditor() {
	let state = EditorState.create({
		schema,
		plugins: [
			transactionCounter,
			history(),
			keymap({ 'Mod-z': undo, 'Mod-y': redo }),
			keymap(baseKeymap)
		]
	});
	let view = new EditorView(document.body, {
		state,
		dispatchTransaction(transaction) {
			console.log(
				'Document size went from',
				transaction.before.content.size,
				'to',
				transaction.doc.content.size
			);
			let newState = view.state.apply(transaction);
			view.updateState(newState);
		},
		decorations(state) {
      return DecorationSet.create(state.doc, [
        Decoration.inline(0, state.doc.content.size, {style: "color: purple"})
      ])
    }
	});

	function turnOffCounting() {
		let tr = view.state.tr.deleteSelection();
		view.dispatch(tr)
	}

	return { view, turnOffCounting };
}

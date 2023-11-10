import { Schema, type MarkSpec, type NodeSpec } from 'prosemirror-model';

const nodes = {
	doc: {
		content: 'heading block+'
	},
	paragraph: {
		group: 'block',
		content: 'text*',
		parseDOM: [{ tag: 'p' }],
		toDOM: () => ['p', 0]
	},
	heading: {
		group: 'block',
		content: 'text*',
		attrs: { level: { default: 1 } },
		marks: '',
		parseDOM: [
			{ tag: 'h1', attrs: { level: 1 } },
			{ tag: 'h2', attrs: { level: 2 } },
			{ tag: 'h3', attrs: { level: 3 } },
			{ tag: 'h4', attrs: { level: 4 } },
			{ tag: 'h5', attrs: { level: 5 } },
			{ tag: 'h6', attrs: { level: 6 } }
		],
		toDOM: (node) => ['h' + node.attrs.level, 0]
	},
	text: {
		inline: true
	}
} satisfies { [key: string]: NodeSpec };

const marks = {
	em: {
		parseDOM: [{ tag: 'em' }, { tag: 'i' }],
		toDOM: () => ['em', 0]
	},
	strong: {
		parseDOM: [{ tag: 'strong' }],
		toDOM: () => ['strong', 0]
	}
} satisfies { [key: string]: MarkSpec };

export const schema = new Schema({ nodes, marks });

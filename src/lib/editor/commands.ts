import type { Command } from 'prosemirror-state';
import { schema } from './schema';

export function toggleHeading(level: number): Command {
	return (state, dispatch) => {
		let applicable = false;
		// presume true until text-block that isn't the toggled heading is found.
		let shouldToggleRemove = true;

		for (let i = 0; i < state.selection.ranges.length; i++) {
			let { $from, $to } = state.selection.ranges[i];
			let from = $from.pos,
				to = $to.pos;
			state.doc.nodesBetween(from, to, (node, pos) => {
				if (!node.isTextblock) return;

				let $pos = state.doc.resolve(pos),
					index = $pos.index();
				let isNotSameType = !node.hasMarkup(schema.nodes.heading, { level });
				let isApplicable = $pos.parent.canReplaceWith(index, index + 1, schema.nodes.heading);

				// it is possible to change this to a heading without content becoming invalid.
				applicable = applicable || isApplicable;

				// if we found one NOT of the same type but can also be changed into our heading,
				// then it means we should toggle "in" not "out".
				if (isNotSameType && isApplicable) {
					shouldToggleRemove = false;
				}
			});
		}

		if (!applicable) {
			return false;
		}

		if (dispatch) {
			let tr = state.tr;
			let nodeType = shouldToggleRemove ? schema.nodes.paragraph : schema.nodes.heading;
			let attrs = shouldToggleRemove ? null : { level };
			console.log(nodeType, attrs);

			for (let i = 0; i < state.selection.ranges.length; i++) {
				let { $from, $to } = state.selection.ranges[i];
				let from = $from.pos,
					to = $to.pos;
				tr.setBlockType(from, to, nodeType, attrs);
			}
			dispatch(tr.scrollIntoView());
		}

		return true;
	};
}

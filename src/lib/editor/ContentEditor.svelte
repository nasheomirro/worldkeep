<!-- The wrapper for ProseMirror -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { EditorView } from 'prosemirror-view';
	import type { EditorState } from 'prosemirror-state';
	import type { EditorInterface } from './editor.types';
	import './editor.scss';

	type Props = {
		initialState: EditorState;
		saveState: (newState: EditorState) => void;
	};

	let { initialState, saveState } = $props<Props>();

	let editor = $state<EditorInterface>();
	let editorContainer: Node;

	// once mounted, we're able to then mount the ProseMirror
	// Editor which we could then create the wrapper for.
	onMount(() => {
		let view = new EditorView(editorContainer, {
			state: initialState,
			dispatchTransaction(tr) {
				let newState = view.state.apply(tr);
				saveState(newState);
				view.updateState(newState);
			}
		});

		editor = {
			state: initialState,
			command(comm, shouldDispatch = true) {
				const dispatch = shouldDispatch ? view.dispatch : undefined;
				return comm(view.state, dispatch, view);
			}
		};

		return () => view.destroy();
	});
</script>

<div>
	<!-- the element to contain the created ProseMirror Editor -->
	<div bind:this={editorContainer} />
</div>

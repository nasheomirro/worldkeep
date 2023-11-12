<script lang="ts">
	import { page } from '$app/stores';
	import Editor from '$lib/editor/Editor.svelte';
</script>

<Editor documentId={$page.params.documentId} />

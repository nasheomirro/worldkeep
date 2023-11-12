<script lang="ts">
	import { page } from '$app/stores';
	import Editor from '$lib/editor/Editor.svelte';
</script>

<div>
	<a href="../">back</a>
</div>

<Editor documentId={$page.params.documentId} />

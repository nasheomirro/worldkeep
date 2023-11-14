<script lang="ts">
	import { documentStore } from '$lib/app/documents';
</script>

<button on:click={() => documentStore.createDocument()}> create </button>

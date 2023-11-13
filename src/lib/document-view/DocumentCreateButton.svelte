<script lang="ts">
	import { documents } from '$lib/app/stores';
	import { nanoid } from 'nanoid';
</script>

<button on:click={() => documents.createDocument(nanoid(12))}> create </button>

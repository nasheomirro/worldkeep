<script lang="ts">
	import type { WorldDocument } from '$lib/app/types';

	export let document: WorldDocument;

	let title = document.title || 'Empty Title';
	let description = document.description || 'No description';
</script>

<li>
	<a href={document.id}>
		<h2>{title}</h2>
		<p>{description}</p>
	</a>
</li>

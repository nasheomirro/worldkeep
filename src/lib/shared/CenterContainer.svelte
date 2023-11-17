<script lang="ts">
	import type { HasChildren } from "$lib/types";
  
  let { children } = $props<HasChildren>();
</script>

<div class="root">
  {@render children()}
</div>

<style lang="scss">
  @use "$lib/scss" as u;

  .root {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    
    max-width: u.breakpoint('md');
    padding: 0 2rem;

    @include u.above("md") {
      max-width: u.breakpoint('lg');
      padding: 0 4rem;
    }

    @include u.above('lg') {
      max-width: u.breakpoint('xl');
    }
  }
</style>
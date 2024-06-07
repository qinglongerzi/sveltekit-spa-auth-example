<script lang="ts">
	import { SideNav, SiteHeader } from '$lib/components/layout';
</script>

<!-- <SiteHeader /> -->
<div class="flex">
	<SideNav />
	<main>
		<slot />
	</main>
</div>

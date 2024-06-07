<script lang="ts">
	import { session } from '$lib/stores/session';
</script>

<pre>{JSON.stringify($session.user, null, 2)}</pre>

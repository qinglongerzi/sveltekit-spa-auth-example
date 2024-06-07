<script>
	import { Code } from '$lib/components/typography';
	import { Button } from '$lib/components/ui/button';
	import { session } from '$lib/stores/session';

	const logout = async () => {
		const response = await fetch('/auth/logout');
		session.set({ user: null, isAuthenticated: false });
	};
</script>

<!-- <Code>test \n rete</Code> -->

<Button on:click={logout}>logout</Button>

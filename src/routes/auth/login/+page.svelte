<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import RegisterForm from './components/register-form.svelte';
	import LoginForm from './components/login-form.svelte';
</script>

<Tabs.Root value="login" class="w-[400px]">
	<Tabs.List class="grid w-full grid-cols-2">
		<Tabs.Trigger value="login">Login</Tabs.Trigger>
		<Tabs.Trigger value="register">Register</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="login">
		<Card.Root class="mx-auto max-w-sm">
			<Card.Header>
				<Card.Title class="text-2xl">Login</Card.Title>
				<Card.Description>Enter your email below to login to your account.</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
				<LoginForm id="login-form" />
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="register">
		<Card.Root class="mx-auto max-w-sm">
			<Card.Header>
				<Card.Title class="text-2xl">Register</Card.Title>
				<Card.Description>Enter your information to create an account</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
				<RegisterForm id="register-form" />
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>

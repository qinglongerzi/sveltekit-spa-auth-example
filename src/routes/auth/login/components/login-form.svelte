<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import SeparatorWithText from '$lib/components/separator/separator-with-text.svelte';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { loginFormSchema } from '$lib/schemas/auth/login-form';
	import SuperDebug from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { continueUrl } from '$lib/tools';

	export let id: string;

	const form = superForm(defaults(zod(loginFormSchema)), {
		id: 'loginForm',
		SPA: true,
		validators: zod(loginFormSchema),
		async onUpdate({ form }) {
			// data submit
			if (!form.valid) return;
			let response = await fetch('/auth/login/email', {
				method: 'POST',
				body: JSON.stringify(form.data),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				const errorMsg = (await response.json()).message;
				toast.error(`${response.status}: ${errorMsg}`);
				return;
			}
			goto(continueUrl($page.url));
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" {id} use:enhance>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} type="email" bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} type="password" bind:value={$formData.password} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full">Login</Form.Button>
	<SeparatorWithText class="my-6">OR</SeparatorWithText>
	<div class="space-y-2">
		<Button
			variant="outline"
			class="w-full"
			href="/auth/login/github?continue={encodeURIComponent(
				$page.url.searchParams.get('continue') || '/'
			)}">Login with GitHub</Button
		>
		<Button
			variant="outline"
			class="w-full"
			href="/auth/login/google?continue={encodeURIComponent(
				$page.url.searchParams.get('continue') || '/'
			)}">Login with Google</Button
		>
	</div>
</form>
<SuperDebug data={$formData} />

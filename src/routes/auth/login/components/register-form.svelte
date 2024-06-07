<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import SeparatorWithText from '$lib/components/separator/separator-with-text.svelte';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { registerFormSchema } from '$lib/schemas/auth/register-form';
	import SuperDebug from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	export let id: string;

	const form = superForm(defaults(zod(registerFormSchema)), {
		id: 'registerForm',
		SPA: true,
		validators: zod(registerFormSchema),
		async onUpdate({ form }) {
			// data submit
			if (!form.valid) return;
			const response = await fetch('/auth/register', {
				method: 'POST',
				body: JSON.stringify(form.data),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const result = await response.json();
			if (response.status >= 400) {
				toast.error(result);
			} else {
				toast.success(result);
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form use:enhance method="POST" {id}>
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
	<Form.Button class="w-full">Create an account</Form.Button>
	<SeparatorWithText class="my-6">OR</SeparatorWithText>
	<Button variant="outline" class="w-full">Register with GitHub</Button>
</form>
<SuperDebug data={$formData} />

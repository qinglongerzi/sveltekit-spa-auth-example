import { json } from '@sveltejs/kit';
import { registerFormSchema } from '$lib/schemas/auth/register-form';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { lucia } from '$lib/server/auth';
import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2';
import { db } from '$lib/server/db';
import { userTable } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';

export const POST = async ({ request, cookies }) => {
	const body = await request.json();
	const form = await superValidate(body, zod(registerFormSchema));

	if (!form.valid) {
		return json(`Validate failed! Reason: ${JSON.stringify(form.errors)}`, { status: 400 });
	}

	const userId = generateIdFromEntropySize(10); // 16 characters long
	const passwordHash = await hash(form.data.password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	// check if username is already used
	const user = await db
		.select()
		.from(userTable)
		.where(
			sql`${userTable.providerUserId} = ${form.data.email} and ${userTable.provider} = 'email'`
		)
		.limit(1);
	if (user.length > 0) {
		return json('User already created!', { status: 400 });
	}

	// create user and session
	await db.insert(userTable).values({
		id: userId,
		email: form.data.email,
		provider: 'email',
		providerUserId: form.data.email,
		passwordHash: passwordHash
	});

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
	return json('User Created!', { status: 201 });
};

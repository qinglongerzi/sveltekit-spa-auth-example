import { error, json } from '@sveltejs/kit';
import { registerFormSchema } from '$lib/schemas/auth/register-form';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { lucia } from '$lib/server/auth';
import { verify } from '@node-rs/argon2';
import { db } from '$lib/server/db';
import { userTable } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';

export const POST = async ({ request, cookies }) => {
	const body = await request.json();
	const form = await superValidate(body, zod(registerFormSchema));

	if (!form.valid) {
		error(400, 'Incorrect username or password!');
	}

	// check if user exists
	const user = await db
		.select()
		.from(userTable)
		.where(
			sql`${userTable.providerUserId} = ${form.data.email} and ${userTable.provider} = 'email'`
		)
		.limit(1);
	if (user.length == 0) {
		error(400, 'Incorrect username or password!');
	}

	// valid password
	const validPassword = await verify(user[0].passwordHash || '', form.data.password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	if (!validPassword) {
		error(400, 'Incorrect username or password!');
	}

	// create session
	const session = await lucia.createSession(user[0].id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
	return json(null);
};

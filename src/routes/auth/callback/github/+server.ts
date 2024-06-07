import { lucia } from '$lib/server/auth';
import { github } from '$lib/server/auth/github';
import { OAuth2RequestError } from 'arctic';
import { generateIdFromEntropySize } from 'lucia';
import { parseCookies } from 'oslo/cookie';
import { db } from '$lib/server/db';
import { userTable } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';

export const GET = async ({ request }) => {
	const cookies = parseCookies(request.headers.get('Cookie') ?? '');
	const stateCookie = cookies.get('oauth_state') ?? null;
	const redirectTo = `/${cookies.get('continue')?.slice(1) || ''}`;

	const url = new URL(request.url);
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	// verify state
	if (!state || !stateCookie || !code || stateCookie !== state) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const providerResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const providerUser = await providerResponse.json();

		const user = await db
			.select()
			.from(userTable)
			.where(
				sql`${userTable.provider} = "github" and ${userTable.providerUserId} = ${providerUser.id}`
			)
			.limit(1);

		// if user exists create session
		if (user.length > 0) {
			const session = await lucia.createSession(user[0].id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			return new Response(null, {
				status: 302,
				headers: {
					Location: redirectTo,
					'Set-Cookie': sessionCookie.serialize()
				}
			});
		}

		// if user not exists, create new account
		const userId = generateIdFromEntropySize(10); // 16 characters long
		await db.insert(userTable).values({
			id: userId,
			provider: 'github',
			providerUserId: providerUser.id,
			email: providerUser.email
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		return new Response(null, {
			status: 302,
			headers: {
				Location: redirectTo,
				'Set-Cookie': sessionCookie.serialize()
			}
		});
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			// bad verification code, invalid credentials, etc
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
};

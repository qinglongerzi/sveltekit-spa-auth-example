import { lucia } from '$lib/server/auth';
import { error, json } from '@sveltejs/kit';

export const GET = async ({ cookies }) => {
	const sessionId = cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		error(401, 'Unauthorized');
	}

	lucia.invalidateSession(sessionId);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});

	return json(null);
};

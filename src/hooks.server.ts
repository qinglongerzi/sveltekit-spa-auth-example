import { lucia } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Retrieve the session ID from the browser's cookies
	const sessionId = event.cookies.get(lucia.sessionCookieName);

	// If there's no session ID, set both user and session to null and return
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	// Attempt to validate the session using the retrieved session ID
	const { session, user } = await lucia.validateSession(sessionId);

	// If the session is newly created (due to session expiration extension), generate a new session cookie
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	// If the session is invalid, generate a blank session cookie to remove the existing session cookie from the browser
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	// Persist the user and session information in the event locals for use within endpoint handlers and page components
	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

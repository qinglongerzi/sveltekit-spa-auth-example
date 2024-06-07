import { generateState } from 'arctic';
import { serializeCookie } from 'oslo/cookie';
import { github } from '$lib/server/auth/github';
import { dev } from '$app/environment';
import { continueUrl } from '$lib/tools';

export const GET = async (event) => {
	const state = generateState();
	const url = await github.createAuthorizationURL(state, { scopes: ['user:email'] });

	const headers = new Headers();
	headers.append('Location', url.toString());
	headers.append(
		'Set-Cookie',
		serializeCookie('oauth_state', state, {
			httpOnly: true,
			secure: !dev, // set `Secure` flag in HTTPS
			maxAge: 60 * 10, // 10 minutes
			path: '/'
		})
	);
	headers.append(
		'Set-Cookie',
		serializeCookie('continue', continueUrl(event.url), {
			httpOnly: true,
			secure: !dev, // set `Secure` flag in HTTPS
			maxAge: 60 * 1, // 1 minutes
			path: '/'
		})
	);

	return new Response(null, {
		status: 302,
		headers: headers
	});
};

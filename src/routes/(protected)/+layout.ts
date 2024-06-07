import { goto } from '$app/navigation';
import { PUBLIC_API_URL } from '$env/static/public';
import { session } from '$lib/stores/session';
import { loginUrl } from '$lib/tools.js';

export const load = async ({ fetch, url }) => {
	const response = await fetch(`${PUBLIC_API_URL}/me`);
	if (!response.ok) {
		session.set({ user: null, isAuthenticated: false });
		goto(loginUrl(url));
	}
	session.set({ user: await response.json(), isAuthenticated: true });
};

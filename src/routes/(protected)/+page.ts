import { goto } from '$app/navigation';
import { isAuthenticated } from '$lib/client/auth';
import { loginUrl } from '$lib/tools.js';

export const load = async ({ url, parent }) => {
	// ensure layout load first
	await parent();

	if (!isAuthenticated()) {
		goto(loginUrl(url));
	}
	// fetch api
	// if (!response.ok) {
	// 	session.set({ user: null, isAuthenticated: false });
	//  goto(loginUrl(url));
	// }
};

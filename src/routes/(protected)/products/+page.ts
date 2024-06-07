import { goto } from '$app/navigation';
import { isAuthenticated } from '$lib/client/auth';
import { loginUrl } from '$lib/tools.js';

export const load = async ({ url }) => {
	if (!isAuthenticated()) {
		goto(loginUrl(url));
	}
};

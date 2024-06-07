import { goto } from '$app/navigation';
import { isAuthenticated, isLoginAs } from '$lib/client/auth';
import { loginUrl } from '$lib/tools';

export const load = async ({ url, parent }) => {
	await parent();

	if (!isAuthenticated()) {
		goto(loginUrl(url));
		return;
	}
	if (!isLoginAs('ADMIN')) {
		goto('/');
		return;
	}
};

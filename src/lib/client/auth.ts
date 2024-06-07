import { session } from '$lib/stores/session';
import { get } from 'svelte/store';
import type { User } from '$lib/server/db/schema';

export const isLoginAs = (role: User['role'] = 'USER') => {
	return get(session).user?.role === role;
};

export const isAuthenticated = () => {
	return get(session).isAuthenticated;
};

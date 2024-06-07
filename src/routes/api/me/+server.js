import { ensureLogin } from '$lib/server/auth';
import { json } from '@sveltejs/kit';

export const GET = async ({ locals }) => {
	ensureLogin(locals);
	return json(locals.user);
};

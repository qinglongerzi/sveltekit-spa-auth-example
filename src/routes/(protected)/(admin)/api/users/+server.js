import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { userTable } from '$lib/server/db/schema';

export const GET = async () => {
	const users = await db.select().from(userTable).limit(100);

	return json(users);
};

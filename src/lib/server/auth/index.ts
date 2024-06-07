import { Lucia, TimeSpan } from 'lucia';
import { dev } from '$app/environment';
import { userTable, sessionTable, type User } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { DrizzleMySQLAdapter } from '@lucia-auth/adapter-drizzle';
import { error } from '@sveltejs/kit';

const adapter = new DrizzleMySQLAdapter(db, sessionTable, userTable);

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			email: User['email'];
			firstName: User['firstName'];
			lastName: User['lastName'];
			fullname: string;
			role: User['role'];
		};
	}
}

export const lucia = new Lucia(adapter, {
	sessionExpiresIn: new TimeSpan(5, 'm'), // 5 minutes
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			firstName: attributes.firstName,
			lastName: attributes.lastName,
			fullname: `${attributes.firstName} ${attributes.lastName}`,
			role: attributes.role
		};
	}
});

export const ensureLogin = (locals: App.Locals) => {
	if (!locals.user || !locals.session) {
		error(401, 'Unauthorized');
	}
};

export const ensureAdmin = (locals: App.Locals) => {
	if (locals.user?.role !== 'ADMIN') {
		error(403, 'Forbidden');
	}
};

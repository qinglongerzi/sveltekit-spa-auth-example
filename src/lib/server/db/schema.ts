import { mysqlTable, varchar, datetime, text, timestamp, unique } from 'drizzle-orm/mysql-core';

export const userTable = mysqlTable(
	'user',
	{
		id: varchar('id', { length: 255 }).primaryKey(),
		provider: varchar('provider', { length: 32 }).notNull().default('email'),
		providerUserId: varchar('provider_user_id', { length: 255 }).notNull(),
		email: varchar('email', { length: 255 }),
		firstName: varchar('first_name', { length: 255 }),
		lastName: varchar('last_name', { length: 255 }),
		role: varchar('role', { length: 32, enum: ['USER', 'ADMIN'] })
			.notNull()
			.default('USER'),
		passwordHash: text('password_hash'),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at').defaultNow().onUpdateNow()
	},
	(table) => ({
		unq: unique('user_unique_id').on(table.provider, table.providerUserId)
	})
);

export type User = typeof userTable.$inferInsert;

export const sessionTable = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => userTable.id),
	expiresAt: datetime('expires_at').notNull()
});

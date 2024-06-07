import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as env from '$env/static/private';

const connection = await mysql.createConnection({
	host: env.DB_HOST,
	port: parseInt(env.DB_PORT),
	user: env.DB_USER,
	database: env.DB_NAME,
	password: env.DB_PASSWORD
});

export const db = drizzle(connection);

import { z } from 'zod';

export const registerFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(5)
});

export type RegisterFormSchema = typeof registerFormSchema;

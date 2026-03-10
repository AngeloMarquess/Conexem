import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    full_name: z.string().min(2),
    role: z.enum(['admin', 'teacher', 'student']).default('student')
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

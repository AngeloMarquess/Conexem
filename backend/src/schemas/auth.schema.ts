import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    full_name: z.string().min(2),
    role: z.enum(['admin', 'teacher', 'student']).default('student'),
    username: z.string().optional(),
    whatsapp: z.string().optional(),
    date_of_birth: z.string().optional(),
    area_atuacao: z.string().optional(),
    diploma_url: z.string().optional(),
    certificados_urls: z.array(z.string()).optional(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

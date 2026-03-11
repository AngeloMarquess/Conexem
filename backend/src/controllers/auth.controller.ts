import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../utils/supabase';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

export const registerHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const data = registerSchema.parse(request.body);

        // 1. Create user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        });

        if (authError || !authData.user) {
            return reply.status(400).send({ error: authError?.message || 'Failed to create user', status: 400 });
        }

        // 2. Add extra profile data to public.users table
        const { error: dbError } = await supabase.from('users').insert({
            id: authData.user.id,
            email: data.email,
            full_name: data.full_name,
            role: data.role,
            username: data.username || null,
            whatsapp: data.whatsapp || null,
            date_of_birth: data.date_of_birth || null,
            area_atuacao: data.area_atuacao || null,
            diploma_url: data.diploma_url || null,
            certificados_urls: data.certificados_urls || null,
        });

        if (dbError) {
            return reply.status(500).send({ error: 'Failed to create user profile', details: dbError.message, status: 500 });
        }

        return reply.status(201).send({
            message: 'User registered successfully',
            user: authData.user,
            session: authData.session
        });
    } catch (error: any) {
        return reply.status(400).send({ error: error.errors || error.message, status: 400 });
    }
};

export const loginHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const data = loginSchema.parse(request.body);

        const { data: authData, error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (error) {
            return reply.status(401).send({ error: 'Invalid credentials', status: 401 });
        }

        // Update last_login
        await supabase.from('users').update({ last_login: new Date().toISOString() }).eq('id', authData.user.id);

        return reply.send({
            message: 'Login successful',
            user: authData.user,
            session: authData.session
        });
    } catch (error: any) {
        return reply.status(400).send({ error: error.errors || error.message, status: 400 });
    }
};

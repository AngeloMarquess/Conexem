import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import { supabase } from '../utils/supabase';

// Middleware to verify Supabase JWT
export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return reply.status(401).send({ error: 'Missing or invalid Authorization header', status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return reply.status(401).send({ error: 'Invalid token', status: 401 });
        }

        // Attach user to request for further use in controllers
        (request as any).user = user;

    } catch (err) {
        return reply.status(500).send({ error: 'Internal Server Error during Authentication', status: 500 });
    }
};

// Middleware to verify Role-Based Access Control
export const roleMiddleware = (allowedRoles: string[]) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const user = (request as any).user;
            if (!user) {
                return reply.status(401).send({ error: 'Unauthorized', status: 401 });
            }

            // We added a trigger to set the role in public.users or app_metadata
            // For simplicity here, we assume role is part of `user.app_metadata.role` or we fetch from DB
            const { data: profile } = await supabase
                .from('users')
                .select('role')
                .eq('id', user.id)
                .single();

            if (!profile || !allowedRoles.includes(profile.role)) {
                return reply.status(403).send({ error: 'Forbidden: Insufficient role', status: 403 });
            }

            // Attach role to user object
            (request as any).user.role = profile.role;

        } catch (err) {
            return reply.status(500).send({ error: 'Internal Server Error during Role Validation', status: 500 });
        }
    };
};

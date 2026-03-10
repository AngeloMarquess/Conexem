import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../utils/supabase';

export const getProfileHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = (request as any).user;

        const [profileResult, gamificationResult] = await Promise.all([
            supabase.from('users').select('*').eq('id', user.id).single(),
            supabase.from('user_gamification').select('*').eq('user_id', user.id).single()
        ]);

        if (profileResult.error) {
            return reply.status(404).send({ error: 'User profile not found', status: 404 });
        }

        return reply.send({
            profile: profileResult.data,
            gamification: gamificationResult.data || { total_points: 0, current_level: 1 }
        });
    } catch (error: any) {
        return reply.status(500).send({ error: 'Internal Server Error', status: 500 });
    }
};

import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../utils/supabase';

// POST /stories (Restricted to teacher/admin)
export const createStoryHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = (request as any).user;
        const { content, media_url } = request.body as any;

        const { data: story, error } = await supabase
            .from('stories')
            .insert({
                teacher_id: user.id,
                content,
                media_url
            })
            .select()
            .single();

        if (error) throw error;

        return reply.status(201).send({ message: 'Story created successfully', story });
    } catch (error: any) {
        return reply.status(500).send({ error: 'Internal Server Error', status: 500 });
    }
};

// GET /stories/active
export const getActiveStoriesHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const now = new Date().toISOString();

        // Stories not expired, from teachers
        const { data: stories, error } = await supabase
            .from('stories')
            .select('*, users(full_name, role)') // includes teacher info
            .gt('expires_at', now)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return reply.send({ stories });
    } catch (error: any) {
        return reply.status(500).send({ error: 'Internal Server Error', status: 500 });
    }
};

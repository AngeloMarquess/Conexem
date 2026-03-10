import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../utils/supabase';

// GET /courses/catalog
export const getCatalogHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { data: courses, error } = await supabase
            .from('courses')
            .select('*');

        if (error) throw error;

        // Grouping by category
        const catalog = courses.reduce((acc: any, course) => {
            acc[course.category] = acc[course.category] || [];
            acc[course.category].push(course);
            return acc;
        }, {});

        return reply.send({ catalog });
    } catch (error: any) {
        return reply.status(500).send({ error: 'Internal Server Error', status: 500 });
    }
};

// GET /courses/:id/roadmap
export const getRoadmapHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string };
        const user = (request as any).user;

        // Fetch modules and lessons
        const { data: modules, error: modulesError } = await supabase
            .from('modules')
            .select('*, lessons(*)')
            .eq('course_id', id)
            .order('order_index', { ascending: true })
            .order('order_index', { referencedTable: 'lessons', ascending: true });

        if (modulesError) throw modulesError;

        // Fetch user progress for these lessons
        // A smarter approach is joining in a view, but we can merge them here.
        const lessonIds = modules.flatMap(m => m.lessons).map(l => l.id);
        const { data: progress } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id)
            .in('lesson_id', lessonIds);

        const progressMap = new Map(progress?.map(p => [p.lesson_id, p]) || []);

        const roadmap = modules.map((m: any) => ({
            ...m,
            lessons: m.lessons.map((l: any) => ({
                ...l,
                progress: progressMap.get(l.id) || { status: 'not_started', watch_time_seconds: 0 }
            }))
        }));

        return reply.send({ roadmap });
    } catch (error: any) {
        return reply.status(500).send({ error: 'Internal Server Error', status: 500 });
    }
};

// GET /user/continue-watching
export const getContinueWatchingHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = (request as any).user;

        const { data: lastActive, error } = await supabase
            .from('user_progress')
            .select('*, lessons(*, modules(course_id))')
            .eq('user_id', user.id)
            .eq('status', 'in_progress')
            .order('completed_at', { ascending: false }) // Fallback timestamp if tracked
            .limit(1)
            .single();

        if (error || !lastActive) {
            return reply.send({ continueWatching: null });
        }

        return reply.send({ continueWatching: lastActive });
    } catch (error: any) {
        return reply.status(500).send({ error: 'Internal Server Error', status: 500 });
    }
};

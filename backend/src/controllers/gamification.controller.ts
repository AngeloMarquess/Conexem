import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../utils/supabase';

// POST /lessons/:id/progress
// { status: 'completed', watch_time: 120 }
export const updateProgressHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id: lessonId } = request.params as { id: string };
        const { status, watch_time } = request.body as any;
        const user = (request as any).user;

        // We should run this within a transaction but Supabase REST API doesn't support transactions out of the box 
        // via standard insert/update. Best practice is an RPC (stored procedure).
        // For simplicity, we will do sequential updates.

        // 1. Update/Upsert Progress
        const { data: progress, error: progressError } = await supabase
            .from('user_progress')
            .upsert({
                user_id: user.id,
                lesson_id: lessonId,
                status,
                watch_time_seconds: watch_time,
                ...(status === 'completed' ? { completed_at: new Date().toISOString() } : {})
            }, { onConflict: 'user_id,lesson_id' })
            .select()
            .single();

        if (progressError) throw progressError;

        let pointsAwarded = 0;

        // 2. If completed, award points and log telemetry
        if (status === 'completed') {
            pointsAwarded = 10; // example fixed points per lesson

            // Telemetry
            await supabase.from('telemetry_logs').insert({
                user_id: user.id,
                action_type: 'lesson_complete',
                lesson_id: lessonId
            });

            // Gamification update
            // Fetch current gamification
            const { data: gamification } = await supabase
                .from('user_gamification')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (gamification) {
                await supabase.from('user_gamification').update({
                    total_points: gamification.total_points + pointsAwarded
                }).eq('user_id', user.id);
            } else {
                await supabase.from('user_gamification').insert({
                    user_id: user.id,
                    total_points: pointsAwarded,
                    current_level: 1
                });
            }
        } else if (status === 'in_progress') {
            // Log start if just beginning
            if (watch_time < 30) {
                await supabase.from('telemetry_logs').insert({
                    user_id: user.id,
                    action_type: 'lesson_start',
                    lesson_id: lessonId
                });
            }
        }

        return reply.send({ message: 'Progress updated', points_awarded: pointsAwarded, progress });
    } catch (error: any) {
        return reply.status(500).send({ error: 'Internal Server Error', status: 500 });
    }
};

// GET /user/badges
export const getBadgesHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = (request as any).user;

        const { data: badges, error } = await supabase
            .from('user_earned_badges')
            .select('*, gamification_badges(*)')
            .eq('user_id', user.id);

        if (error) throw error;

        return reply.send({ badges });
    } catch (error: any) {
        return reply.status(500).send({ error: 'Internal Server Error', status: 500 });
    }
};

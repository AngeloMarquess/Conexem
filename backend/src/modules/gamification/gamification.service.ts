import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export class GamificationService {

    async updateProgressAndXP(data: { userId: string; lessonId: string; watchTimeSeconds: number; isCompleted: boolean }) {
        // 1. Update Video Progress
        const { data: progressData, error: progressError } = await supabase
            .from('user_progress')
            .upsert(
                {
                    user_id: data.userId,
                    lesson_id: data.lessonId,
                    watch_time_seconds: data.watchTimeSeconds,
                    status: data.isCompleted ? 'completed' : 'in_progress',
                    completed_at: data.isCompleted ? new Date().toISOString() : null,
                },
                { onConflict: 'user_id,lesson_id' }
            )
            .select()
            .single();

        if (progressError) throw new Error(`Progress Sync Error: ${progressError.message}`);

        // 2. Award XP if the lesson just got completed
        if (data.isCompleted) {
            // Ideally we check if it was ALREADY completed before to not double-award XP,
            // but for MVP simplicity we award static 50 XP. We Upsert Gamification table.

            const xpToAward = 50;

            // Fetch current stats
            const { data: currentGamification } = await supabase
                .from('user_gamification')
                .select('total_points, current_level')
                .eq('user_id', data.userId)
                .single();

            const currentPoints = currentGamification?.total_points || 0;
            const newPoints = currentPoints + xpToAward;

            // Dumb logic: level up every 500 points
            const newLevel = Math.floor(newPoints / 500) + 1;

            const { error: gamificationError } = await supabase
                .from('user_gamification')
                .upsert({
                    user_id: data.userId,
                    total_points: newPoints,
                    current_level: newLevel
                });

            if (gamificationError) throw new Error(`Gamification Award Error: ${gamificationError.message}`);
        }

        return { success: true, meta: progressData };
    }

    async getBadgesForUser(userId: string) {
        const { data, error } = await supabase
            .from('user_earned_badges')
            .select(`
                earned_at,
                gamification_badges (
                    id,
                    name,
                    icon_url,
                    required_points
                )
            `)
            .eq('user_id', userId);

        if (error) throw new Error(`Gamification Fetch Badges Error: ${error.message}`);

        return data;
    }
}

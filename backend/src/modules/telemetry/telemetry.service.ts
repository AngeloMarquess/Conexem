import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export class TelemetryService {

    async insertLog(data: { userId: string; actionType: string; lessonId?: string; storyId?: string }) {
        const { error } = await supabase
            .from('telemetry_logs')
            .insert({
                user_id: data.userId,
                action_type: data.actionType,
                lesson_id: data.lessonId || null,
                story_id: data.storyId || null
            });

        if (error) {
            throw new Error(`Telemetry Insert Error: ${error.message}`);
        }
        return true;
    }

    async calculateChurnRisk() {
        // Here we could implement the full algorithm or call an external AI analysis block.
        // For MVP, we calculate how many days since last_login on users table minus 7 days.
        // Users passing 7 days are considered "medium risk", 14+ "high risk".

        const { data: users, error } = await supabase
            .from('users')
            .select('id, full_name, email, last_login')
            .eq('role', 'student');

        if (error) throw new Error(`Fetch Risk Users Error: ${error.message}`);

        const now = new Date();

        const riskMetrics = users.map(user => {
            const lastLogin = user.last_login ? new Date(user.last_login) : null;
            let riskLevel = 'Low';
            let daysInactive = 0;

            if (!lastLogin) {
                riskLevel = 'High'; // Never logged in
            } else {
                const diffTime = Math.abs(now.getTime() - lastLogin.getTime());
                daysInactive = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (daysInactive > 14) riskLevel = 'High';
                else if (daysInactive > 7) riskLevel = 'Medium';
            }

            return {
                ...user,
                daysInactive,
                riskLevel
            };
        });

        // Split arrays logically
        const highRisk = riskMetrics.filter(u => u.riskLevel === 'High');
        const mediumRisk = riskMetrics.filter(u => u.riskLevel === 'Medium');

        return {
            totalAnalysed: users.length,
            highRiskCount: highRisk.length,
            mediumRiskCount: mediumRisk.length,
            highRiskUsers: highRisk,
        };
    }
}

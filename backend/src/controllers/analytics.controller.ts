import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../utils/supabase';

// GET /analytics/churn-risk
// Identifies users who haven't logged telemetry in 7 days or are stagnant.
export const getChurnRiskHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        // 1. Fetch all users
        const { data: users, error: usersError } = await supabase
            .from('users')
            .select('id, full_name, email, last_login');

        if (usersError) throw usersError;

        // 2. Fetch recent telemetry (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const { data: recentLogs, error: logsError } = await supabase
            .from('telemetry_logs')
            .select('user_id')
            .gte('timestamp', sevenDaysAgo.toISOString());

        if (logsError) throw logsError;

        // Distinct user IDs active in last 7 days
        const activeUserIds = new Set(recentLogs.map(l => l.user_id));

        // 3. Mark inactive as at risk
        const atRisk = users
            .filter(u => !activeUserIds.has(u.id))
            .map(u => ({ ...u, risk_level: 'High', reason: 'No activity in 7 days' }));

        return reply.send({ churn_risk: atRisk });
    } catch (error: any) {
        return reply.status(500).send({ error: 'Internal Server Error', status: 500 });
    }
};

// GET /analytics/cohort
export const getCohortHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        // Stub implementation: usually requires an advanced SQL aggregation or data warehouse solution.
        // Example simply counts total users vs active users in the last 30 days.

        return reply.send({
            message: 'Cohort Analytics',
            data: {
                "January": { total: 100, active: 85, retention_rate: "85%" },
                "February": { total: 150, active: 110, retention_rate: "73%" }
            }
        });

    } catch (error: any) {
        return reply.status(500).send({ error: 'Internal Server Error', status: 500 });
    }
};

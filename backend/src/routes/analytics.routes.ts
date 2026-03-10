import { FastifyInstance } from 'fastify';
import { getChurnRiskHandler, getCohortHandler } from '../controllers/analytics.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';

export default async function analyticsRoutes(server: FastifyInstance) {
    server.addHook('preHandler', authMiddleware);
    server.addHook('preHandler', roleMiddleware(['admin', 'teacher']));

    server.get('/churn-risk', getChurnRiskHandler);
    server.get('/cohort', getCohortHandler);
}

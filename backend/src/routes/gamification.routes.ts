import { FastifyInstance } from 'fastify';
import { updateProgressHandler, getBadgesHandler } from '../controllers/gamification.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export default async function gamificationRoutes(server: FastifyInstance) {
    server.addHook('preHandler', authMiddleware);

    server.post('/lessons/:id/progress', updateProgressHandler);
    server.get('/user/badges', getBadgesHandler);
}

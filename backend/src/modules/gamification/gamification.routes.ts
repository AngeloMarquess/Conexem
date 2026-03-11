import { FastifyInstance } from 'fastify';
import { GamificationController } from './gamification.controller';

export async function gamificationRoutes(fastify: FastifyInstance) {
    const controller = new GamificationController();

    // Fastify Routes /api/gamification
    fastify.post('/progress', controller.trackProgress.bind(controller));
    fastify.get('/badges/:userId', controller.getUserBadges.bind(controller));
}

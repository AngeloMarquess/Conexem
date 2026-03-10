import { FastifyInstance } from 'fastify';
import { getCatalogHandler, getRoadmapHandler, getContinueWatchingHandler } from '../controllers/content.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export default async function contentRoutes(server: FastifyInstance) {
    server.addHook('preHandler', authMiddleware);

    server.get('/catalog', getCatalogHandler);
    server.get('/:id/roadmap', getRoadmapHandler);

    // Mounted directly under user in the spec, but we can put it here or in user routes. Let's register it carefully in server.ts
}

import { FastifyInstance } from 'fastify';
import { createStoryHandler, getActiveStoriesHandler } from '../controllers/stories.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';

export default async function storiesRoutes(server: FastifyInstance) {
    server.addHook('preHandler', authMiddleware);

    // Read is public for authenticated users
    server.get('/active', getActiveStoriesHandler);

    // Create is restricted to admin or teacher
    server.post('/', { preHandler: [roleMiddleware(['admin', 'teacher'])] }, createStoryHandler);
}

import { FastifyInstance } from 'fastify';
import { getProfileHandler } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export default async function userRoutes(server: FastifyInstance) {
    server.addHook('preHandler', authMiddleware);

    server.get('/profile', getProfileHandler);
}

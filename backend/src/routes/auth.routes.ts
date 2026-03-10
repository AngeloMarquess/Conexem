import { FastifyInstance } from 'fastify';
import { loginHandler, registerHandler } from '../controllers/auth.controller';

export default async function authRoutes(server: FastifyInstance) {
    server.post('/register', registerHandler);
    server.post('/login', loginHandler);
}

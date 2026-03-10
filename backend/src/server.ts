import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import contentRoutes from './routes/content.routes';
import gamificationRoutes from './routes/gamification.routes';
import storiesRoutes from './routes/stories.routes';
import analyticsRoutes from './routes/analytics.routes';

import { onipublishRoutes } from './modules/onipublish/onipublish.routes';
import { courseRoutes } from './modules/courses/course.routes';

const server = Fastify({
    logger: true
});

server.register(cors, {
    origin: '*'
});

// Admin Integration & Course Modules
server.register(onipublishRoutes, { prefix: '/api/onipublish' });
server.register(courseRoutes, { prefix: '/api/courses' });

// Register Original Domain Routes (Mocked currently based on root plan)
server.register(authRoutes, { prefix: '/auth' });
server.register(userRoutes, { prefix: '/users' });
server.register(contentRoutes, { prefix: '/courses' });
server.register(gamificationRoutes, { prefix: '/' }); // handles /lessons/:id/progress & /user/badges
server.register(storiesRoutes, { prefix: '/stories' });
server.register(analyticsRoutes, { prefix: '/analytics' });

server.get('/health', async (request, reply) => {
    return { status: 'up', timestamp: new Date().toISOString() };
});

const start = async () => {
    try {
        await server.listen({ port: Number(process.env.PORT) || 3000, host: '0.0.0.0' });
        console.log(`Server listening on port ${process.env.PORT || 3000}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();

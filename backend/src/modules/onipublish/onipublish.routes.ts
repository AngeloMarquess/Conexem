import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { OnipublishController } from './onipublish.controller';

export const onipublishRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
    const controller = new OnipublishController();

    // POST /api/onipublish/sync
    app.post('/sync', controller.syncCourses.bind(controller));
};

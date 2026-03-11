import { FastifyInstance } from 'fastify';
import { StoriesController } from './stories.controller';

export async function storiesRoutes(fastify: FastifyInstance) {
    const controller = new StoriesController();

    // Fastify Routes /api/stories
    fastify.post('/', controller.createStory.bind(controller));
    fastify.get('/active', controller.getActiveStories.bind(controller));
}

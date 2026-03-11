import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { StoriesService } from './stories.service';

const createStorySchema = z.object({
    teacherId: z.string().uuid(),
    content: z.string().optional(),
    mediaUrl: z.string().url().optional(),
    expiresInHours: z.number().int().min(1).max(72).default(24)
}).refine(data => data.content || data.mediaUrl, {
    message: "A story must contain either content or mediaUrl",
    path: ["content"]
});

export class StoriesController {
    private service: StoriesService;

    constructor() {
        this.service = new StoriesService();
    }

    async createStory(request: FastifyRequest, reply: FastifyReply) {
        try {
            const data = createStorySchema.parse(request.body);
            const story = await this.service.createStory(data);

            return reply.status(201).send({ success: true, data: story });
        } catch (error: any) {
            request.log.error(error);
            if (error?.name === 'ZodError') {
                return reply.status(400).send({ success: false, error: 'Invalid story payload', details: error.issues });
            }
            return reply.status(500).send({ success: false, error: 'Internal server error while creating story' });
        }
    }

    async getActiveStories(request: FastifyRequest, reply: FastifyReply) {
        try {
            const stories = await this.service.getActiveStories();
            return reply.send({ success: true, data: stories });
        } catch (error: any) {
            request.log.error(error);
            return reply.status(500).send({ success: false, error: 'Failed to fetch active stories' });
        }
    }
}

import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { GamificationService } from './gamification.service';

const progressSchema = z.object({
    userId: z.string().uuid(),
    lessonId: z.string().uuid(),
    watchTimeSeconds: z.number().nonnegative(),
    isCompleted: z.boolean(),
});

export class GamificationController {
    private service: GamificationService;

    constructor() {
        this.service = new GamificationService();
    }

    async trackProgress(request: FastifyRequest, reply: FastifyReply) {
        try {
            const data = progressSchema.parse(request.body);
            const result = await this.service.updateProgressAndXP(data);

            return reply.send({ success: true, data: result });
        } catch (error: any) {
            request.log.error(error);
            if (error?.name === 'ZodError') {
                return reply.status(400).send({ success: false, error: 'Invalid data', details: error.issues });
            }
            return reply.status(500).send({ success: false, error: 'Internal server error while tracking progress' });
        }
    }

    async getUserBadges(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { userId } = z.object({ userId: z.string().uuid() }).parse(request.params);
            const badges = await this.service.getBadgesForUser(userId);

            return reply.send({ success: true, data: badges });
        } catch (error: any) {
            request.log.error(error);
            return reply.status(500).send({ success: false, error: 'Failed to list user badges' });
        }
    }
}

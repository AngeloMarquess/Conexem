import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { TelemetryService } from './telemetry.service';

const logSchema = z.object({
    userId: z.string().uuid(),
    actionType: z.enum(['login', 'lesson_start', 'lesson_complete', 'story_view']),
    lessonId: z.string().uuid().optional(),
    storyId: z.string().uuid().optional(),
});

export class TelemetryController {
    private service: TelemetryService;

    constructor() {
        this.service = new TelemetryService();
    }

    async registerLog(request: FastifyRequest, reply: FastifyReply) {
        try {
            const data = logSchema.parse(request.body);
            await this.service.insertLog(data);

            return reply.send({ success: true });
        } catch (error: any) {
            request.log.error(error);
            if (error?.name === 'ZodError') {
                return reply.status(400).send({ success: false, error: 'Invalid telemetry payload', details: error.issues });
            }
            return reply.status(500).send({ success: false, error: 'Internal server error processing log element' });
        }
    }

    async getChurnRiskMetrics(request: FastifyRequest, reply: FastifyReply) {
        try {
            const metrics = await this.service.calculateChurnRisk();
            return reply.send({ success: true, data: metrics });
        } catch (error: any) {
            request.log.error(error);
            return reply.status(500).send({ success: false, error: 'Failed to evaluate churn probabilities' });
        }
    }
}

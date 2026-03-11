import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { OnipublishService } from './onipublish.service';

const syncSchema = z.object({
    instituicao: z.string().min(1, 'Código da instituição é obrigatório'),
    token: z.string().min(5, 'Token parece inválido (muito curto)')
});

export class OnipublishController {
    private service: OnipublishService;

    constructor() {
        this.service = new OnipublishService();
    }

    async syncCourses(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { instituicao, token } = syncSchema.parse(request.body);

            const result = await this.service.syncDisciplinas(instituicao, token);

            return reply.status(200).send({ success: true, data: result });
        } catch (error) {
            request.log.error(error);

            if (error instanceof z.ZodError) {
                return reply.status(400).send({ success: false, error: 'Validation failed', details: error.errors });
            }

            const message = error instanceof Error ? error.message : 'Failed to sync with Onipublish';
            return reply.status(500).send({ success: false, error: message });
        }
    }
}

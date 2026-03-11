import { FastifyInstance } from 'fastify';
import { TelemetryController } from './telemetry.controller';

export async function telemetryRoutes(fastify: FastifyInstance) {
    const controller = new TelemetryController();

    // Fastify Routes /api/telemetry
    fastify.post('/log', controller.registerLog.bind(controller));
    fastify.get('/churn-risk', controller.getChurnRiskMetrics.bind(controller));
}

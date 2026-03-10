import { FastifyInstance } from 'fastify';
import { CourseController } from './course.controller';

export async function courseRoutes(fastify: FastifyInstance) {
    const controller = new CourseController();

    // /api/courses
    fastify.get('/', controller.listCourses.bind(controller));
}

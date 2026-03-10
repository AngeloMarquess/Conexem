import { FastifyReply, FastifyRequest } from 'fastify';
import { CourseService } from './course.service';

export class CourseController {
    private service: CourseService;

    constructor() {
        this.service = new CourseService();
    }

    async listCourses(request: FastifyRequest, reply: FastifyReply) {
        try {
            const courses = await this.service.getAllCourses();
            return reply.send({ data: courses });
        } catch (error: any) {
            return reply.status(500).send({
                error: 'Failed to list courses',
                details: error.message
            });
        }
    }
}

import { FastifyInstance } from 'fastify';
import { WaiterModel } from '../../models/waiter';

type BodyParams = {
  waiterId: number;
};

export const getById = async (fastify: FastifyInstance) => {
  fastify.route<{ Body: BodyParams }>({
    method: 'POST',
    url: '/waiter.getById',

    handler: async (request, reply) => {
      const { waiterId } = request.body;

      const waiter = await WaiterModel.findOne({
        where: { id: waiterId },
      });

      if (!waiter) {
        return reply.notFound();
      }

      return reply.send(waiter);
    },
  });
};

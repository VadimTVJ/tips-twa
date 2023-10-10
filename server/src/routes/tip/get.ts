import { FastifyInstance } from 'fastify';
import { TipModel } from '../../models/tip';
import { checkLaunchParams } from '../../hooks';

export const get = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/tip.get',

    preHandler: [checkLaunchParams],
    handler: async (request, reply) => {
      const { userId } = request.user;

      const tips = await TipModel.find({
        where: { user_id: userId },
        relations: { waiter: true },
        order: { id: 'DESC' },
      });

      return reply.send(tips);
    },
  });
};

import { FastifyInstance } from 'fastify';
import * as tip from './tip';
import * as waiter from './waiter';

export const routesHandler = async (fastify: FastifyInstance) => {
  fastify.register(tip.get);
  fastify.register(tip.getInvoiceLink);

  fastify.register(waiter.getById);
};

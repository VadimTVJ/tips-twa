import { FastifyInstance } from 'fastify';
import { WaiterModel } from '../../models/waiter';
import { currencies } from '../../constants';
import { checkLaunchParams } from '../../hooks';

type BodyParams = {
  waiterId: number;
  tipsAmount: number;
  currency: string;
};

export const getInvoiceLink = async (fastify: FastifyInstance) => {
  fastify.route<{ Body: BodyParams }>({
    method: 'POST',
    url: '/tip.getInvoiceLink',

    preHandler: [checkLaunchParams],
    handler: async (request, reply) => {
      const { waiterId, tipsAmount, currency: currencyCode } = request.body;

      const waiter = await WaiterModel.findOne({
        where: { id: waiterId },
      });

      if (!waiter) {
        return reply.notFound();
      }

      if (tipsAmount <= 0) {
        return reply.forbidden();
      }

      const currency = currencies.find(({ code }) => code === currencyCode);
      if (!currency) {
        return reply.forbidden();
      }

      // @ts-ignore wrong lib types
      const invoiceLink = await fastify.bot.createInvoiceLink(
        `Thanks for ${waiter.name}`,
        'Description',
        JSON.stringify({ waiterId, tipsAmount, currencyCode }),
        process.env.TG_PAYMENT_TOKEN as string,
        currency.code,
        [{ label: 'Tips', amount: tipsAmount * 100 }],
        {
          photo_url: waiter.photo,
        },
      );

      return reply.send(invoiceLink);
    },
  });
};

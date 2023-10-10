import {
  FastifyInstance, FastifyPlugin,
} from 'fastify';
import fp from 'fastify-plugin';
import TelegramBot, { Update } from 'node-telegram-bot-api';

type BotPluginParams = {
  botToken: string;
  webhookDomain: string;
};

const botPlugin: FastifyPlugin<BotPluginParams> = async (
  fastify: FastifyInstance,
  { botToken, webhookDomain },
  done,
) => {
  const bot = new TelegramBot(botToken);
  bot.setWebHook(`${webhookDomain}/bot`);

  fastify.post<{ Body: Update }>('/bot', (request, reply) => {
    bot.processUpdate(request.body);

    return reply.send();
  });

  fastify.decorate('bot', bot);

  fastify.addHook('onClose', (request, doneHook) => {
    bot.closeWebHook();
    doneHook();
  });

  done();
};

export default fp(botPlugin);

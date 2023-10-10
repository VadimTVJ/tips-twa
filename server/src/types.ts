import TelegramBot from 'node-telegram-bot-api';

declare module 'fastify' {
  interface FastifyInstance {
    bot: TelegramBot;
  }

  interface FastifyRequest {
    user: {
      userId: number;
      tgId: number;
    };
  }
}

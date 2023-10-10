import 'dotenv/config';
import 'reflect-metadata';

import fastify from 'fastify';
import fastifySensible from '@fastify/sensible';
import fastifyCors from '@fastify/cors';
import { routesHandler } from './routes';
import { botHandler } from './bot';
import { connectDatabase } from './db';
import botPlugin from './plugins/botPlugin';

const port = Number(process.env.PORT) || 3002;
const host = process.env.HOST as string;

const startServer = async () => {
  try {
    const server = fastify();

    server.register(fastifyCors, { origin: '*' });
    server.register(fastifySensible);
    server.register(botPlugin, {
      botToken: process.env.TG_TOKEN as string,
      webhookDomain: process.env.DOMAIN as string,
    });

    server.register(routesHandler, { prefix: '/api/' });
    server.register(botHandler);

    console.log(
      'Server started on',
      await server.listen({
        port,
        host,
      }),
    );
  } catch (e) {
    console.error(e);
  }
};

Promise.all([connectDatabase(5)])
  .then(() => {
    startServer();
  });

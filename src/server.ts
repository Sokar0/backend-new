import 'reflect-metadata';
import 'dotenv/config';

import fastifySwagger from '@fastify/swagger';
import Fastify, { FastifyInstance } from 'fastify';
import { bootstrap } from 'fastify-decorators';

import { UserController } from './controllers/UserController.js';
import { FakeController } from './controllers/FakeController.js';

let server: FastifyInstance;
server = Fastify({
  logger: true,
});

async function start() {
  try {
    server.register(fastifySwagger, {
      routePrefix: '/docs',
      swagger: {
        info: {
          title: 'CPS/MS_Template Documentation',
          description: 'Endpoints for Template Microservice',
          version: '1.0.0'
        },
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        securityDefinitions: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header'
          }
        }
      },
      exposeRoute: true,
    });

    server.register(bootstrap, {
      controllers: [
        UserController,
        FakeController
      ],
    });

    const port: number = (process.env.NODE_ENV == 'local' ? Number(process.env.HTTP_PORT) : Number(process.env.HTTPS_PORT));
    const address = await server.listen({
      port: port,
      host: '::',
    })
    console.log(`Application running and listening at ${address}`);
    console.log(`Documentation available at ${address}/docs`);
    console.log(`Available routes: \n${server.printRoutes()}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
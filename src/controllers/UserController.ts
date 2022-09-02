import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, DELETE, GET, POST, PUT } from 'fastify-decorators';
import * as FluentJsonSchema from 'fluent-json-schema';
import { User, UserInput } from '../entities/User';
import { UserService } from '../services/UserService.js';

const Schema = FluentJsonSchema.default;

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) { }

  @GET("/",
    {
      schema: {
        tags: ["User"]
      }
    }
  )
  getAll(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @GET("/:id",
    {
      schema: {
        tags: ["User"],
        params: Schema.object()
          .title('Um título aqui')
          .description('Uma descrição aqui')
          .prop('id', Schema.number().required())
      }
    }
  )
  async getById(request: FastifyRequest<{ Params: { id: number } }>): Promise<User> {
    const message = await this.userService.getUserBy(request.params.id);

    if (!message) throw { statusCode: 404, message: 'Entity not found' };
    return message;
  }

  @POST('/',
    {
      schema: {
        tags: ["User"],
        body: Schema.object()
          .title('Um título aqui')
          .description('Uma descrição aqui')
          .prop('firstName', Schema.string().required())
          .prop('lastName', Schema.string().required())
          .prop('email', Schema.string())
          .prop('address', Schema.string())
      }
    })
  async create(request: FastifyRequest<{ Body: UserInput }>): Promise<User> {
    return await this.userService.createOrUpdateUser(request.body);
  }

  @PUT('/',
    {
      schema: {
        tags: ["User"],
        body: Schema.object()
          .title('Um título aqui')
          .description('Uma descrição aqui')
          .prop('id', Schema.number().required())
          .prop('firstName', Schema.string())
          .prop('lastName', Schema.string())
          .prop('email', Schema.string())
          .prop('address', Schema.string())
      }
    })
  async update(request: FastifyRequest<{ Body: UserInput }>): Promise<User> {
    return await this.userService.createOrUpdateUser(request.body);
  }

  @DELETE('/:id',
    {
      schema: {
        tags: ["User"],
        params: Schema.object()
          .title('Um título aqui')
          .description('Uma descrição aqui')
          .prop('id', Schema.number().required())
      }
    }
  )
  async deleteById(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
    await this.userService.deleteBy(request.params.id);

    reply.status(200).send();
  }
}

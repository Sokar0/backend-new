import { Controller, POST } from 'fastify-decorators';

@Controller('/fake')
export class FakeController {
  @POST('/',
    {
      schema: {
        tags: ["Fake"]
      }
    })
  async create() {
    return {
      "Message": "OK"
    };
  }
}

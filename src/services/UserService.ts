import { Initializer, Service } from '@fastify-decorators/simple-di';
import type { Repository } from 'typeorm';
import { User } from '../entities/User.js';
import { PostgresDataSourceProvider } from '../config/databases/pgDataSourceProvider.js';
import UserRepository from '../repositories/UserRepository.js';

@Service()
export class UserService {
  private repository!: Repository<User>;

  constructor(private postgresDataSourceProvider: PostgresDataSourceProvider) {}

  @Initializer([PostgresDataSourceProvider])
  async init(): Promise<void> {
    this.repository = UserRepository(this.postgresDataSourceProvider.dataSource);
  }

  async getUsers(): Promise<User[]> {
    return this.repository.find();
  }

  async getUserBy(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async createOrUpdateUser(user: Partial<User>): Promise<User> {
    return this.repository.save(user);
  }

  async deleteBy(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

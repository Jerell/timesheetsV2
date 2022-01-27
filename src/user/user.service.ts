import { Injectable } from '@nestjs/common';
import {
  Repository,
  InjectRepository,
  AzureTableStorageResultList,
  AzureTableStorageResponse,
} from '@nestjs/azure-database';
import { User } from './user.entity';
import { UserDTO } from './user.dto';
const Fuse = require('fuse.js');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async find(rowKey: string, user: User): Promise<User> {
    return this.userRepository.find(rowKey, user);
  }

  async findAll(): Promise<AzureTableStorageResultList<User>> {
    return this.userRepository.findAll();
  }

  async count(): Promise<number> {
    return (await this.findAll()).entries.length;
  }

  async searchByName(name: string): Promise<AzureTableStorageResultList<User>> {
    const people = new Fuse((await this.userRepository.findAll()).entries, {
      keys: ['name'],
    });
    return people.search(name);
  }

  async listAllUsers(): Promise<
    {
      name: string;
      id: string;
    }[]
  > {
    return (await this.findAll()).entries.map(({ name, id }) => ({ name, id }));
  }

  async create(user: User, rowKey: string): Promise<User> {
    return this.userRepository.create(user, rowKey);
  }

  async update(rowKey: string, user: Partial<User>): Promise<User> {
    return this.userRepository.update(rowKey, user);
  }

  async delete(rowKey: string, user: User): Promise<AzureTableStorageResponse> {
    return this.userRepository.delete(rowKey, user);
  }
}

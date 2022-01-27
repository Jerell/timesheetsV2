import { Injectable } from '@nestjs/common';
import {
  Repository,
  InjectRepository,
  AzureTableStorageResultList,
  AzureTableStorageResponse,
} from '@nestjs/azure-database';
import { User } from './user.entity';

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

  async create(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async update(rowKey: string, user: Partial<User>): Promise<User> {
    return this.userRepository.update(rowKey, user);
  }

  async delete(rowKey: string, user: User): Promise<AzureTableStorageResponse> {
    return this.userRepository.delete(rowKey, user);
  }
}

import { Injectable } from '@nestjs/common';
import {
  Repository,
  InjectRepository,
  AzureTableStorageResultList,
  AzureTableStorageResponse,
} from '@nestjs/azure-database';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async find(rowKey: string, event: Event): Promise<Event> {
    return this.eventRepository.find(rowKey, event);
  }

  async findAll(): Promise<AzureTableStorageResultList<Event>> {
    return this.eventRepository.findAll();
  }

  async count(): Promise<number> {
    return (await this.findAll()).entries.length;
  }

  async create(event: Event, rowKey: string): Promise<Event> {
    return this.eventRepository.create(event, rowKey);
  }

  async update(rowKey: string, event: Partial<Event>): Promise<Event> {
    return this.eventRepository.update(rowKey, event);
  }

  async delete(
    rowKey: string,
    event: Event,
  ): Promise<AzureTableStorageResponse> {
    return this.eventRepository.delete(rowKey, event);
  }
}

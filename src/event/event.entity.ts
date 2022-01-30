import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
  EntityInt32,
} from '@nestjs/azure-database';
import { EventDTO } from './event.dto';

@EntityPartitionKey('Event')
@EntityRowKey('')
export class Event {
  @EntityString() task: string;

  @EntityString()
  payload: string;

  constructor({ task, payload }: EventDTO = new EventDTO()) {
    this.task = task;
    this.payload = JSON.stringify(payload);
  }
}

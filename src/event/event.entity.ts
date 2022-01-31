import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
} from '@nestjs/azure-database';
import { EventDTO } from './event.dto';

@EntityPartitionKey('Event')
@EntityRowKey('')
export class Event {
  @EntityString() taskID: string;

  @EntityString() type: string;

  @EntityString()
  payload: string;

  constructor({ taskID, type, payload }: EventDTO = new EventDTO()) {
    this.taskID = taskID;
    this.type = type;
    this.payload = JSON.stringify(payload);
  }
}

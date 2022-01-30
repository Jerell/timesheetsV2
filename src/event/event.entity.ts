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

  constructor({ taskID, payload }: EventDTO = new EventDTO()) {
    this.taskID = taskID;
    this.payload = JSON.stringify(payload);
  }
}

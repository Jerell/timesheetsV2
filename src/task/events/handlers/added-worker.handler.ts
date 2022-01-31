import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Event } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';
import { AddedWorkerEvent } from '../added-worker.event';

@Injectable()
@EventsHandler(AddedWorkerEvent)
export class AddedWorkerHandler implements IEventHandler<AddedWorkerEvent> {
  constructor(private readonly eventService: EventService) {}

  async handle(event: AddedWorkerEvent) {
    this.eventService.createNext(
      new Event({
        taskID: event.taskID,
        type: 'addWorker',
        payload: {
          userID: event.userID,
        },
      }),
    );
  }
}

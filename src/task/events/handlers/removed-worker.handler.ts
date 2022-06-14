import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Event } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';
import { RemovedWorkerEvent } from '../removed-worker.event';

@Injectable()
@EventsHandler(RemovedWorkerEvent)
export class RemovedWorkerHandler implements IEventHandler<RemovedWorkerEvent> {
  constructor(private readonly eventService: EventService) {}

  async handle(event: RemovedWorkerEvent) {
    this.eventService.createNext(
      new Event({
        taskID: event.taskID,
        type: 'removeWorker',
        payload: {
          userID: event.userID,
        },
      })
    );
  }
}

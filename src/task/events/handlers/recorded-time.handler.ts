import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Event } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';
import { RecordedTimeEvent } from '../recorded-time.event';

@Injectable()
@EventsHandler(RecordedTimeEvent)
export class RecordedTimeHandler implements IEventHandler<RecordedTimeEvent> {
  constructor(private eventService: EventService) {}

  async handle(event: RecordedTimeEvent) {
    this.eventService.createNext(
      new Event({
        taskID: event.taskID,
        type: 'recordTime',
        payload: {
          userID: event.userID,
          n: event.n,
          day: event.day,
        },
      }),
    );
  }
}

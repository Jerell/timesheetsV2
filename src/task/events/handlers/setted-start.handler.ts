import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Event } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';
import { SettedStartEvent } from '../setted-start.event';

@Injectable()
@EventsHandler(SettedStartEvent)
export class SettedStartHandler implements IEventHandler<SettedStartEvent> {
  constructor(private readonly eventService: EventService) {}

  async handle(event: SettedStartEvent) {
    this.eventService.createNext(
      new Event({
        taskID: event.taskID,
        type: 'setStart',
        payload: {
          day: event.day,
        },
      }),
    );
  }
}

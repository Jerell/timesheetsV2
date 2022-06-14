import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Event } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';
import { SettedEndEvent } from '../setted-end.event';

@Injectable()
@EventsHandler(SettedEndEvent)
export class SettedEndHandler implements IEventHandler<SettedEndEvent> {
  constructor(private readonly eventService: EventService) {}

  async handle(event: SettedEndEvent) {
    this.eventService.createNext(
      new Event({
        taskID: event.taskID,
        type: 'setEnd',
        payload: {
          day: event.day,
        },
      })
    );
  }
}

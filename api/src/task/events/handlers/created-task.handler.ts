import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Event } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';
import { CreatedTaskEvent } from '../created-task.event';

@Injectable()
@EventsHandler(CreatedTaskEvent)
export class CreatedTaskHandler implements IEventHandler<CreatedTaskEvent> {
  constructor(private eventService: EventService) {}

  async handle(event: CreatedTaskEvent) {
    this.eventService.createNext(
      new Event({
        taskID: event.taskID,
        type: 'createTask',
        payload: {
          start: event.start,
          end: event.end,
        },
      })
    );
  }
}

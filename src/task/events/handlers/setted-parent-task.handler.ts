import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Event } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';
import { SettedParentTaskEvent } from '../setted-parent-task.event';

@Injectable()
@EventsHandler(SettedParentTaskEvent)
export class SettedParentTaskHandler
  implements IEventHandler<SettedParentTaskEvent>
{
  constructor(private readonly eventService: EventService) {}

  async handle(event: SettedParentTaskEvent) {
    console.log(1, 'yuh');
    this.eventService.createNext(
      new Event({
        taskID: event.taskID,
        type: 'setParentTask',
        payload: {
          parentTaskID: event.parentTaskID,
        },
      }),
    );
  }
}

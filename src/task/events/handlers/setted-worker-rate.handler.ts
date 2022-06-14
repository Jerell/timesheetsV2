import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Event } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';
import { SettedWorkerRateEvent } from '../setted-worker-rate.event';

@Injectable()
@EventsHandler(SettedWorkerRateEvent)
export class SettedWorkerRateHandler
  implements IEventHandler<SettedWorkerRateEvent>
{
  constructor(private readonly eventService: EventService) {}

  async handle(event: SettedWorkerRateEvent) {
    this.eventService.createNext(
      new Event({
        taskID: event.taskID,
        type: 'setWorkerRate',
        payload: {
          userID: event.userID,
          rate: event.rate,
        },
      })
    );
  }
}

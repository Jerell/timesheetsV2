import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Event } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';
import { SettedPriceEvent } from '../setted-price.event';

@Injectable()
@EventsHandler(SettedPriceEvent)
export class SettedPriceHandler implements IEventHandler<SettedPriceEvent> {
  constructor(private readonly eventService: EventService) {}

  async handle(event: SettedPriceEvent) {
    this.eventService.createNext(
      new Event({
        taskID: event.taskID,
        type: 'setPrice',
        payload: {
          thing: event.thing,
          price: event.price,
        },
      }),
    );
  }
}

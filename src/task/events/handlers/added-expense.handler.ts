import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Event } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';
import { AddedExpenseEvent } from '../added-expense.event';

@Injectable()
@EventsHandler(AddedExpenseEvent)
export class AddedExpenseHandler implements IEventHandler<AddedExpenseEvent> {
  constructor(private readonly eventService: EventService) {}

  async handle(event: AddedExpenseEvent) {
    this.eventService.createNext(
      new Event({
        taskID: event.taskID,
        type: 'addExpense',
        payload: {
          thing: event.thing,
          quantity: event.quantity,
          day: event.day,
        },
      }),
    );
  }
}

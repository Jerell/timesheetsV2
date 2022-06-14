import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from 'src/task/repository/task.repository';
import { SetPriceCommand } from '../set-price.command';

@Injectable()
@CommandHandler(SetPriceCommand)
export class SetPriceHandler implements ICommandHandler<SetPriceCommand> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: SetPriceCommand): Promise<any> {
    const { taskID, thing, price } = command;
    const task = this.publisher.mergeObjectContext(
      await this.repository.findOneByID(taskID)
    );
    task.setPrice(thing, price);
    task.commit();
  }
}

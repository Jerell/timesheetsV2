import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from 'src/task/repository/task.repository';
import { SetWorkerRateCommand } from '../set-worker-rate.command';

@Injectable()
@CommandHandler(SetWorkerRateCommand)
export class SetWorkerRateHandler
  implements ICommandHandler<SetWorkerRateCommand>
{
  constructor(
    private readonly repository: TaskRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: SetWorkerRateCommand) {
    const { taskID, userID, rate } = command;
    const task = this.publisher.mergeObjectContext(
      await this.repository.findOneByID(taskID)
    );
    task.setWorkerRate(userID, rate);
    task.commit();
  }
}

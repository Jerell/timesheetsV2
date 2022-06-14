import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from 'src/task/repository/task.repository';
import { AddWorkerCommand } from '../add-worker.command';

@Injectable()
@CommandHandler(AddWorkerCommand)
export class AddWorkerHandler implements ICommandHandler<AddWorkerCommand> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: AddWorkerCommand) {
    const { taskID, userID } = command;
    const task = this.publisher.mergeObjectContext(
      await this.repository.findOneByID(taskID)
    );
    task.addWorker(userID);
    task.commit();
  }
}

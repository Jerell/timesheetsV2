import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from 'src/task/repository/task.repository';
import { RemoveWorkerCommand } from '../remove-worker.command';

@Injectable()
@CommandHandler(RemoveWorkerCommand)
export class RemoveWorkerHandler
  implements ICommandHandler<RemoveWorkerCommand>
{
  constructor(
    private readonly repository: TaskRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: RemoveWorkerCommand) {
    const { taskID, userID } = command;
    const task = this.publisher.mergeObjectContext(
      await this.repository.findOneByID(taskID),
    );
    task.removeWorker(userID);
    task.commit();
  }
}

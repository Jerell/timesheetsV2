import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from 'src/task/repository/task.repository';
import { SetParentTaskCommand } from '../set-parent-task.command';

@Injectable()
@CommandHandler(SetParentTaskCommand)
export class SetParentTaskHandler
  implements ICommandHandler<SetParentTaskCommand>
{
  constructor(
    private readonly repository: TaskRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: SetParentTaskCommand) {
    const { taskID, parentTaskID } = command;
    const task = this.publisher.mergeObjectContext(
      await this.repository.findOneByID(taskID),
    );
    const parent = await this.repository.findOneByID(parentTaskID);
    task.parent = parent;
    task.commit();
  }
}

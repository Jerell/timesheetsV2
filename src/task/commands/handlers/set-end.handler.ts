import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from 'src/task/repository/task.repository';
import { SetEndCommand } from '../set-end.command';

@Injectable()
@CommandHandler(SetEndCommand)
export class SetEndHandler implements ICommandHandler<SetEndCommand> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: SetEndCommand) {
    const { taskID, day } = command;
    const task = this.publisher.mergeObjectContext(
      await this.repository.findOneByID(taskID),
    );
    task.setEnd(day);
    task.commit();
  }
}

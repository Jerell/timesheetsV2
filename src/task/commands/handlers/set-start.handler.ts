import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from 'src/task/repository/task.repository';
import { SetStartCommand } from '../set-start.command';

@Injectable()
@CommandHandler(SetStartCommand)
export class SetStartHandler implements ICommandHandler<SetStartCommand> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: SetStartCommand) {
    const { taskID, day } = command;
    const task = this.publisher.mergeObjectContext(
      await this.repository.findOneByID(taskID),
    );
    task.setStart(day);
    task.commit();
  }
}

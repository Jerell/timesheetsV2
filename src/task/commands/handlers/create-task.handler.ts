import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from 'src/task/repository/task.repository';
import { CreateTaskCommand } from '../create-task.command';

@Injectable()
@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    private repository: TaskRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: CreateTaskCommand) {
    const { taskID, start, end } = command;

    const task = this.publisher.mergeObjectContext(
      await this.repository.create(taskID, start, end),
    );

    task.commit();
  }
}

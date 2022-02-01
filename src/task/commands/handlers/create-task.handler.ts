import { Injectable } from '@nestjs/common';
import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CreatedTaskEvent } from 'src/task/events/created-task.event';
import { Task } from 'src/task/models/task.model';
import { TaskRepository } from 'src/task/repository/task.repository';
import { CreateTaskCommand } from '../create-task.command';

@Injectable()
@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateTaskCommand) {
    const { taskID, start, end } = command;
    const task = this.publisher.mergeObjectContext(
      await this.repository.create(taskID, start, end),
    );

    task.setID(taskID);

    task.commit();
    task.publish(new CreatedTaskEvent(taskID, start, end));
  }
}

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
    private repository: TaskRepository,
    private publisher: EventPublisher,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateTaskCommand) {
    const { taskID, start, end } = command;

    const TaskModel = this.publisher.mergeClassContext(Task);

    const t = new TaskModel('taskID');
    t.setID(taskID);
    t.markDay(start);
    t.markDay(end);

    this.repository.add(t);

    // const task = this.publisher.mergeObjectContext(t);

    // task.commit();

    this.eventBus.publish(new CreatedTaskEvent(taskID, start, end));
  }
}

import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from 'src/task/repository/task.repository';
import { RecordTimeCommand } from '../record-time.command';

@Injectable()
@CommandHandler(RecordTimeCommand)
export class RecordTimeHandler implements ICommandHandler<RecordTimeCommand> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RecordTimeCommand) {
    const { taskID, userID, n, day } = command;
    const task = this.publisher.mergeObjectContext(
      await this.repository.findOneByID(taskID)
    );
    task.recordTime(userID, n, day);
    task.commit();
  }
}

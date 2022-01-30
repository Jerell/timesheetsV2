import { Injectable, HttpException } from '@nestjs/common';
import { TASKS } from '../mocks/tasks.mock';
import { newTaskDTO } from './dto/new-task.dto';
import { Task } from './models/task.model';
import { EventBus, CommandBus } from '@nestjs/cqrs';
import { recordTimeDTO } from './dto/record-time.dto';
import { RecordTimeCommand } from './commands/record-time.command';
import { TaskRepository } from './repository/task.repository';
import { CreateTaskCommand } from './commands/create-task.command';
import { IDay } from 'src/common/daynum';

@Injectable()
export class TasksService {
  tasks = TASKS.map((t) => new Task(t.id));

  constructor(
    private readonly commandBus: CommandBus,
    private repository: TaskRepository,
  ) {}

  async recordTime(recordTimeDto: recordTimeDTO) {
    return this.commandBus.execute(
      new RecordTimeCommand(
        recordTimeDto.taskID,
        recordTimeDto.userID,
        recordTimeDto.n,
        recordTimeDto.day,
      ),
    );
  }

  async getTasks() {
    return await this.repository.findAll();
  }

  async getTask(taskID: string) {
    return await this.repository.findOneByID(taskID);
  }

  async create(taskID: string, start: IDay, end: IDay) {
    return this.commandBus.execute(new CreateTaskCommand(taskID, start, end));
  }
}

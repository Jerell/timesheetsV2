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
import { AddWorkerDTO } from './dto/add-worker.dto';
import { AddWorkerCommand } from './commands/add-worker.command';
import { SetParentTaskCommand } from './commands/set-parent-task.command';

@Injectable()
export class TasksService {
  constructor(
    private readonly commandBus: CommandBus,
    private repository: TaskRepository,
  ) {}

  async getTasks() {
    return await this.repository.findAll();
  }

  async getTask(taskID: string) {
    return await this.repository.findOneByID(taskID);
  }

  async create(taskID: string, start: IDay, end: IDay) {
    return this.commandBus.execute(new CreateTaskCommand(taskID, start, end));
  }

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

  async addWorker(addWorkerDto: AddWorkerDTO) {
    return this.commandBus.execute(
      new AddWorkerCommand(addWorkerDto.taskID, addWorkerDto.userID),
    );
  }

  async setParentTask(setParentTaskDto) {
    return this.commandBus.execute(
      new SetParentTaskCommand(
        setParentTaskDto.taskID,
        setParentTaskDto.parentTaskID,
      ),
    );
  }
}

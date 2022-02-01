import { HttpException, Injectable } from '@nestjs/common';
import { Task } from '../models/task.model';
import { IDay } from 'src/common/daynum';
import { ReadService } from '../models/read.service';

@Injectable()
export class TaskRepository {
  constructor(private readonly readService: ReadService) {}
  tasks = this.readService.read();

  async findOneByID(taskID: string) {
    const task = (await this.tasks).find((task) => task.id === taskID);
    if (!task) {
      throw new HttpException('Task does not exist', 404);
    }
    return task;
  }

  async findAll() {
    return await this.tasks;
  }

  async create(taskID: string, start: IDay, end: IDay) {
    const task = new Task(taskID);
    task.markDay(start);
    task.markDay(end);

    (await this.tasks).push(task);

    return task;
  }

  async add(task: Task) {
    (await this.tasks).push(task);
    return task;
  }

  async setParent(taskID: string, parentTaskID: string) {
    const task = await this.findOneByID(taskID);
    const parent = await this.findOneByID(parentTaskID);
    task.parent = parent;
    return task;
  }
}

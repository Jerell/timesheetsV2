import { HttpException, Injectable } from '@nestjs/common';
import { Task } from '../models/task.model';
import { TASKS } from 'src/mocks/tasks.mock';
import { IDay } from 'src/common/daynum';

@Injectable()
export class TaskRepository {
  tasks = TASKS.map((t) => {
    const task = new Task(t.id);
    task.addWorker('107125877581320298992');
    return task;
  });

  async findOneByID(taskID: string) {
    const task = this.tasks.find((task) => task.id === taskID);
    if (!task) {
      throw new HttpException('Task does not exist', 404);
    }
    return task;
  }

  async findAll() {
    return this.tasks;
  }

  async create(taskID: string, start: IDay, end: IDay) {
    const task = new Task(taskID);
    task.markDay(start);
    task.markDay(end);

    this.tasks.push(task);

    return task;
  }

  add(task: Task) {
    this.tasks.push(task);
    return task;
  }
}

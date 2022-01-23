import { Injectable, HttpException } from '@nestjs/common';
import { TASKS } from '../mocks/tasks.mock';
import { newTaskDTO } from './dto/newTask.dto';
import { Task } from './task';

@Injectable()
export class TasksService {
  tasks = TASKS.map((t) => new Task(t.id));

  getTasks() {
    return this.tasks;
  }

  getTask(taskID: string) {
    const task = this.tasks.find((task) => task.id === taskID);
    if (!task) {
      throw new HttpException('Task does not exist', 404);
    }
    return task;
  }

  addTask(newTask: newTaskDTO) {
    const task = new Task(newTask.id);
    task.markDay(newTask.start);
    task.markDay(newTask.end);

    this.tasks.push(task);
    return this.getTask(task.id);
  }
}

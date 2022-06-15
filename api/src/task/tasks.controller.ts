import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks() {
    const tasks = this.tasksService.getTasks();
    return tasks;
  }

  @Get(':taskID')
  async getTask(@Param('taskID') taskID) {
    const task = this.tasksService.getTask(taskID);
    return task;
  }
}

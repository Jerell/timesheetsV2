import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTasks() {
    const tasks = this.tasksService.getTasks();
    return tasks;
  }

  @Get(':taskID')
  @UseGuards(JwtAuthGuard)
  async getTask(@Param('taskID') taskID) {
    const task = this.tasksService.getTask(taskID);
    return task;
  }
}

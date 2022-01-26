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
import { GoogleAuthGuard } from 'src/auth/google/google-auth.guard';
import { newTaskDTO } from './dto/newTask.dto';
import { TasksService } from './tasks.service';

@Controller('task')
export class TaskController {
  constructor(private tasksService: TasksService) {}

  @Get(':taskID')
  @UseGuards(GoogleAuthGuard)
  async getTask(@Param('taskID') taskID) {
    const task = this.tasksService.getTask(taskID);
    return task;
  }

  @Post('new')
  @UseGuards(GoogleAuthGuard)
  async addTask(@Body() newTaskDTO: newTaskDTO) {
    const task = this.tasksService.addTask(newTaskDTO);
    return task;
  }
}

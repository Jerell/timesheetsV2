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
import { AddWorkerDTO } from './dto/add-worker.dto';
import { newTaskDTO } from './dto/new-task.dto';
import { recordTimeDTO } from './dto/record-time.dto';
import { RemoveWorkerDTO } from './dto/remove-worker.dto';
import { SetParentTaskDTO } from './dto/set-parent-task.dto';
import { SetStartDTO } from './dto/set-start.dto';
import { TasksService } from './tasks.service';

@Controller('task')
export class TaskController {
  constructor(private tasksService: TasksService) {}

  @Get(':taskID')
  async getTask(@Param('taskID') taskID) {
    const task = this.tasksService.getTask(taskID);
    return task;
  }

  @Post('new')
  async addTask(@Body() newTaskDto: newTaskDTO) {
    await this.tasksService.create(
      newTaskDto.taskID,
      newTaskDto.start,
      newTaskDto.end,
    );
    return await this.tasksService.getTask(newTaskDto.taskID);
  }

  @Post('submit')
  async submitTime(@Body() recordTimeDto: recordTimeDTO) {
    await this.tasksService.recordTime(recordTimeDto);
    return this.tasksService.getTask(recordTimeDto.taskID);
  }

  @Post('assign')
  async assign(@Body() addWorkerDTO: AddWorkerDTO) {
    await this.tasksService.addWorker(addWorkerDTO);
    return this.tasksService.getTask(addWorkerDTO.taskID);
  }

  @Post('unassign')
  async unassign(@Body() removeworkerDto: RemoveWorkerDTO) {
    await this.tasksService.removeWorker(removeworkerDto);
  }

  @Post('setParent')
  async setParent(@Body() setParentTaskDto: SetParentTaskDTO) {
    await this.tasksService.setParentTask(setParentTaskDto);
    return this.tasksService.getTask(setParentTaskDto.taskID);
  }

  @Post('setStart')
  async setStart(@Body() setStartDto: SetStartDTO) {
    await this.tasksService.setStart(setStartDto);
  }
}

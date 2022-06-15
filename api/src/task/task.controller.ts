import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AddExpenseDTO } from './dto/add-expense.dto';
import { AddWorkerDTO } from './dto/add-worker.dto';
import { newTaskDTO } from './dto/new-task.dto';
import { recordTimeDTO } from './dto/record-time.dto';
import { RemoveWorkerDTO } from './dto/remove-worker.dto';
import { SetEndDTO } from './dto/set-end.dto';
import { SetParentTaskDTO } from './dto/set-parent-task.dto';
import { SetPriceDTO } from './dto/set-price.dto';
import { SetStartDTO } from './dto/set-start.dto';
import { SetWorkerRateDTO } from './dto/set-worker-rate.dto';
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
      newTaskDto.end
    );
    return await this.tasksService.getTask(newTaskDto.taskID);
  }

  @Post('submit')
  async submitTime(@Body() recordTimeDto: recordTimeDTO) {
    await this.tasksService.recordTime(recordTimeDto);
    return await this.tasksService.getTask(recordTimeDto.taskID);
  }

  @Post('assign')
  async assign(@Body() addWorkerDTO: AddWorkerDTO) {
    await this.tasksService.addWorker(addWorkerDTO);
    return await this.tasksService.getTask(addWorkerDTO.taskID);
  }

  @Post('unassign')
  async unassign(@Body() removeworkerDto: RemoveWorkerDTO) {
    await this.tasksService.removeWorker(removeworkerDto);
  }

  @Post('setParent')
  async setParent(@Body() setParentTaskDto: SetParentTaskDTO) {
    await this.tasksService.setParentTask(setParentTaskDto);
    return await this.tasksService.getTask(setParentTaskDto.taskID);
  }

  @Post('setStart')
  async setStart(@Body() setStartDto: SetStartDTO) {
    await this.tasksService.setStart(setStartDto);
    return await this.tasksService.getTask(setStartDto.taskID);
  }

  @Post('setEnd')
  async setEnd(@Body() setEndDto: SetEndDTO) {
    await this.tasksService.setEnd(setEndDto);
    return await this.tasksService.getTask(setEndDto.taskID);
  }

  @Post('setWorkerRate')
  async setWorkerRate(@Body() setWorkerRateDto: SetWorkerRateDTO) {
    await this.tasksService.setWorkerRate(setWorkerRateDto);
    return await this.tasksService.getTask(setWorkerRateDto.taskID);
  }

  @Post('expense/price')
  async setPrice(@Body() setPriceDto: SetPriceDTO) {
    await this.tasksService.setPrice(setPriceDto);
    return await this.tasksService.getTask(setPriceDto.taskID);
  }

  @Post('expense/add')
  async addExpense(@Body() addExpenseDto: AddExpenseDTO) {
    await this.tasksService.addExpense(addExpenseDto);
    return await this.tasksService.getTask(addExpenseDto.taskID);
  }
}

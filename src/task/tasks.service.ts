import { Injectable, HttpException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { recordTimeDTO } from './dto/record-time.dto';
import { RecordTimeCommand } from './commands/record-time.command';
import { TaskRepository } from './repository/task.repository';
import { CreateTaskCommand } from './commands/create-task.command';
import { IDay } from 'src/common/daynum';
import { AddWorkerDTO } from './dto/add-worker.dto';
import { AddWorkerCommand } from './commands/add-worker.command';
import { SetParentTaskCommand } from './commands/set-parent-task.command';
import { RemoveWorkerDTO } from './dto/remove-worker.dto';
import { RemoveWorkerCommand } from './commands/remove-worker.command';
import { SetStartDTO } from './dto/set-start.dto';
import { SetParentTaskDTO } from './dto/set-parent-task.dto';
import { SetStartCommand } from './commands/set-start.command';
import { SetEndDTO } from './dto/set-end.dto';
import { SetEndCommand } from './commands/set-end.command';
import { SetWorkerRateDTO } from './dto/set-worker-rate.dto';
import { SetWorkerRateCommand } from './commands/set-worker-rate.command';
import { SetPriceDTO } from './dto/set-price.dto';
import { SetPriceCommand } from './commands/set-price.command';
import { AddExpenseDTO } from './dto/add-expense.dto';
import { AddExpenseCommand } from './commands/add-expense.command';

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

  async setWorkerRate(setWorkerRateDto: SetWorkerRateDTO) {
    return this.commandBus.execute(
      new SetWorkerRateCommand(
        setWorkerRateDto.taskID,
        setWorkerRateDto.userID,
        setWorkerRateDto.rate,
      ),
    );
  }

  async removeWorker(removeworkerDto: RemoveWorkerDTO) {
    return this.commandBus.execute(
      new RemoveWorkerCommand(removeworkerDto.taskID, removeworkerDto.userID),
    );
  }

  async setParentTask(setParentTaskDto: SetParentTaskDTO) {
    return this.commandBus.execute(
      new SetParentTaskCommand(
        setParentTaskDto.taskID,
        setParentTaskDto.parentTaskID,
      ),
    );
  }

  async setStart(setStartDto: SetStartDTO) {
    return this.commandBus.execute(
      new SetStartCommand(setStartDto.taskID, setStartDto.day),
    );
  }

  async setEnd(setEndDto: SetEndDTO) {
    return this.commandBus.execute(
      new SetEndCommand(setEndDto.taskID, setEndDto.day),
    );
  }

  async setPrice(setPriceDto: SetPriceDTO) {
    return this.commandBus.execute(
      new SetPriceCommand(
        setPriceDto.taskID,
        setPriceDto.thing,
        setPriceDto.price,
      ),
    );
  }

  async addExpense(addExpenseDto: AddExpenseDTO) {
    return this.commandBus.execute(
      new AddExpenseCommand(
        addExpenseDto.taskID,
        addExpenseDto.thing,
        addExpenseDto.quantity,
        addExpenseDto.day,
      ),
    );
  }
}

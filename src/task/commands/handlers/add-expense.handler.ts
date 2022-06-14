import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from 'src/task/repository/task.repository';
import { AddExpenseCommand } from '../add-expense.command';

@Injectable()
@CommandHandler(AddExpenseCommand)
export class AddExpenseHandler implements ICommandHandler<AddExpenseCommand> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: AddExpenseCommand): Promise<any> {
    const { taskID, thing, quantity, day } = command;
    const task = this.publisher.mergeObjectContext(
      await this.repository.findOneByID(taskID)
    );
    task.addExpense(thing, quantity, day);
    task.commit();
  }
}

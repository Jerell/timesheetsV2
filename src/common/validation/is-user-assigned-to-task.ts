import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { TasksService } from 'src/task/tasks.service';

@ValidatorConstraint({ name: 'isUserAssignedToTask', async: true })
@Injectable()
export class IsUserAssignedToTaskConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly taskService: TasksService) {}

  public async validate(value: any, args?: ValidationArguments) {
    const [taskIDField] = args.constraints;
    const taskID = args.object[taskIDField];
    const task = await this.taskService.getTask(taskID);

    return task.workers.includes(value);
  }

  public defaultMessage(validationArguments?: ValidationArguments): string {
    return `User $value has not been assigned to this task`;
  }
}

export function IsUserAssignedToTask(
  taskIDField: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUserAssignedToTask',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [taskIDField],
      options: validationOptions,
      validator: IsUserAssignedToTaskConstraint,
    });
  };
}

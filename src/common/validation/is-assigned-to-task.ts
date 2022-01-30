import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { TasksService } from 'src/task/tasks.service';

@ValidatorConstraint({ name: 'isAssignedToTask', async: true })
@Injectable()
export class IsAssignedToTaskConstraint
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

export function IsAssignedToTask(
  taskIDField: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAssignedToTask',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [taskIDField],
      options: validationOptions,
      validator: IsAssignedToTaskConstraint,
    });
  };
}

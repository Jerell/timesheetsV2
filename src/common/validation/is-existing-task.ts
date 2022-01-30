import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { TasksService } from 'src/task/tasks.service';

@ValidatorConstraint({ name: 'isExistingTask', async: true })
@Injectable()
export class IsExistingTaskConstraint implements ValidatorConstraintInterface {
  constructor(private readonly taskService: TasksService) {}

  public async validate(value: any, args?: ValidationArguments) {
    try {
      await this.taskService.getTask(value);
    } catch (error) {
      return false;
    }
    return true;
  }

  public defaultMessage(validationArguments?: ValidationArguments): string {
    return `$property $value is not a task that exists`;
  }
}

export function IsExistingTask(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isExistingTask',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsExistingTaskConstraint,
    });
  };
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UserService } from 'src/user/user.service';

@ValidatorConstraint({ name: 'isRegistered', async: true })
@Injectable()
export class IsRegisteredConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  public async validate(value: string, args: ValidationArguments) {
    const users = (await this.userService.listAllUsers()).map((u) => u.id);
    return users.includes(value);
  }

  public defaultMessage(validationArguments?: ValidationArguments): string {
    return `$property is not a registered user`;
  }
}

export function IsRegistered(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isRegistered',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRegisteredConstraint,
    });
  };
}

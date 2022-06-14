import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotEqualTo', async: false })
export class IsNotEqualToConstraint implements ValidatorConstraintInterface {
  public validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value !== relatedValue;
  }

  public defaultMessage(validationArguments?: ValidationArguments): string {
    return `$property must not equal ${validationArguments.targetName}`;
  }
}

export function IsNotEqualTo(
  otherField: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotEqualTo',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [otherField],
      validator: IsNotEqualToConstraint,
    });
  };
}

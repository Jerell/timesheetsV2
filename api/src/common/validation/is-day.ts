/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getDaysInMonth } from 'date-fns';

@ValidatorConstraint({ name: 'isDay', async: false })
export class IsDayConstraint implements ValidatorConstraintInterface {
  public validate(value: string, args: ValidationArguments) {
    if (value.length != 10) return false;
    const [year, month, day] = value.split('-').map((v) => Number(v));

    if (!year || !month || !day) return false;
    if (year < 2000) return false;
    if (month > 12) return false;

    const maxDays = getDaysInMonth(new Date(year, month));
    if (day > maxDays) return false;

    return true;
  }

  public defaultMessage(args: ValidationArguments) {
    // Set the default error message here
    return `$property must be a string in the format yyyy-MM-dd`;
  }
}

export function IsDay(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDay',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDayConstraint,
    });
  };
}

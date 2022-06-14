import { IsNumber, IsString } from 'class-validator';
import { IDay } from 'src/common/daynum';
import { IsDay } from 'src/common/validation/is-day';
import { IsExistingTask } from 'src/common/validation/is-existing-task';

export class AddExpenseDTO {
  @IsString()
  @IsExistingTask()
  readonly taskID: string;
  @IsString()
  readonly thing: string;
  @IsNumber()
  readonly quantity: number;
  @IsDay()
  readonly day: IDay;
}

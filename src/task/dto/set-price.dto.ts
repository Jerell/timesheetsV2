import { IsNumber, IsString } from 'class-validator';
import { IsExistingTask } from 'src/common/validation/is-existing-task';

export class SetPriceDTO {
  @IsString()
  @IsExistingTask()
  readonly taskID: string;
  @IsString()
  readonly thing: string;
  @IsNumber()
  readonly price: number;
}

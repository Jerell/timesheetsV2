import { IsString } from 'class-validator';
import { IDay } from 'src/common/daynum';
import { IsDay } from 'src/common/validation/is-day';
import { IsExistingTask } from '../../common/validation/is-existing-task';

export class SetEndDTO {
  @IsString()
  @IsExistingTask()
  readonly taskID: string;
  @IsDay()
  readonly day: IDay;
}

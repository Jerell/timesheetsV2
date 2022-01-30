import { IsNumber, IsString } from 'class-validator';
import { IDay } from 'src/common/daynum';
import { IsExistingTask } from 'src/common/validation/is-existing-task';
import { IsAssignedToTask } from 'src/common/validation/is-assigned-to-task';
import { IsRegistered } from 'src/common/validation/isRegistered';
import { IsDay } from '../../common/validation/is-day';

export class recordTimeDTO {
  @IsString()
  @IsExistingTask()
  readonly taskID: string;
  @IsString()
  @IsRegistered()
  @IsAssignedToTask('taskID')
  readonly userID: string;
  @IsNumber()
  readonly n: number;
  @IsDay()
  readonly day: IDay;
}

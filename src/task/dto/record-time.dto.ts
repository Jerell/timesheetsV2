import { IsNumber, IsString } from 'class-validator';
import { IDay } from 'src/common/daynum';
import { isAssignedToTask } from 'src/common/validation/isAssignedToTask';
import { IsRegistered } from 'src/common/validation/isRegistered';
import { IsDay } from '../../common/validation/isDay';

export class recordTimeDTO {
  @IsString()
  readonly taskID: string;
  @IsString()
  @IsRegistered()
  @isAssignedToTask('taskID')
  readonly userID: string;
  @IsNumber()
  readonly n: number;
  @IsDay()
  readonly day: IDay;
}

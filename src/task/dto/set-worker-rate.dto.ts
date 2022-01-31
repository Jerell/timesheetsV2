import { IsNumber, IsString } from 'class-validator';
import { IsExistingTask } from 'src/common/validation/is-existing-task';
import { IsUserAssignedToTask } from 'src/common/validation/is-user-assigned-to-task';

export class SetWorkerRateDTO {
  @IsString()
  @IsExistingTask()
  readonly taskID: string;
  @IsString()
  @IsUserAssignedToTask('taskID')
  readonly userID: string;
  @IsNumber()
  readonly rate: number;
}

import { IsString } from 'class-validator';
import { IsExistingTask } from 'src/common/validation/is-existing-task';
import { IsNotEqualTo } from 'src/common/validation/is-not-equal-to';

export class SetParentTaskDTO {
  @IsString()
  @IsExistingTask()
  readonly taskID: string;
  @IsString()
  @IsExistingTask()
  @IsNotEqualTo('taskID')
  readonly parentTaskID: string;
}

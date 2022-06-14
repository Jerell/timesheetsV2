import { IsString } from 'class-validator';
import { IsExistingTask } from 'src/common/validation/is-existing-task';

export class AddWorkerDTO {
  @IsString()
  @IsExistingTask()
  readonly taskID: string;
  @IsString()
  readonly userID: string;
}

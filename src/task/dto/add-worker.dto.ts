import { IsString } from 'class-validator';

export class AddWorkerDTO {
  @IsString()
  readonly taskID: string;
  @IsString()
  readonly userID: string;
}

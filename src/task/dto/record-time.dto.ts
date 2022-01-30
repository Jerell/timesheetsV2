import { IsNumber, IsString } from 'class-validator';
import { IDay } from 'src/common/daynum';
import { IsDay } from '../../common/validation/isDay';

export class recordTimeDTO {
  @IsString()
  readonly taskID: string;
  @IsString()
  readonly userID: string;
  @IsNumber()
  readonly n: number;
  @IsDay()
  readonly day: IDay;
}

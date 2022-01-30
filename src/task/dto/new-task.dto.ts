import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IDay } from 'src/common/daynum';
import { IsDay } from '../../common/validation/isDay';

export class newTaskDTO {
  @IsString()
  readonly taskID: string;
  @ApiProperty({
    description: 'The first day of the task',
    example: '2022-01-23',
    type: 'string',
  })
  @IsDay()
  readonly start: IDay;
  @ApiProperty({
    description: 'The first day of the task',
    example: '2022-01-23',
    type: 'string',
  })
  @IsDay()
  readonly end: IDay;
}

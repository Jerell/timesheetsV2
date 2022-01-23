import { ApiProperty } from '@nestjs/swagger';
import { IDay } from 'src/common/daynum';

export class newTaskDTO {
  readonly id: string;
  @ApiProperty({
    description: 'The first day of the task',
    example: '2022-01-23',
    type: 'string',
  })
  readonly start: IDay;
  @ApiProperty({
    description: 'The first day of the task',
    example: '2022-01-23',
    type: 'string',
  })
  readonly end: IDay;
}

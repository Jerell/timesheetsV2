import { IDay } from 'src/common/daynum';

export class CreateTaskCommand {
  constructor(
    public readonly taskID: string,
    public readonly start: IDay,
    public readonly end: IDay
  ) {}
}

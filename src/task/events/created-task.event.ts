import { IDay } from 'src/common/daynum';

export class CreatedTaskEvent {
  constructor(
    public readonly taskID: string,
    public readonly start: IDay,
    public readonly end: IDay
  ) {}
}

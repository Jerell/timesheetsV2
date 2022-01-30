import { IDay } from 'src/common/daynum';

export class RecordedTimeEvent {
  constructor(
    public readonly taskID: string,
    public readonly userID: string,
    public readonly n: number,
    public readonly day: IDay,
  ) {}
}

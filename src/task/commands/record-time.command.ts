import { IDay } from 'src/common/daynum';

export class RecordTimeCommand {
  constructor(
    public readonly taskID: string,
    public readonly userID: string,
    public readonly n: number,
    public readonly day: IDay,
  ) {}
}

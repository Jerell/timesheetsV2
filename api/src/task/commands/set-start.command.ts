import { IDay } from 'src/common/daynum';

export class SetStartCommand {
  constructor(public readonly taskID: string, public readonly day: IDay) {}
}

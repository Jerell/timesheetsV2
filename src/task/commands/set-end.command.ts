import { IDay } from 'src/common/daynum';

export class SetEndCommand {
  constructor(public readonly taskID: string, public readonly day: IDay) {}
}

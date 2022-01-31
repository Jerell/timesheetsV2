import { IDay } from 'src/common/daynum';

export class AddedExpenseEvent {
  constructor(
    public readonly taskID: string,
    public readonly thing: string,
    public readonly quantity: number,
    public readonly day: IDay,
    public readonly type: string,
  ) {}
}

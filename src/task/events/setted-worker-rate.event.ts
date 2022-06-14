export class SettedWorkerRateEvent {
  constructor(
    public readonly taskID: string,
    public readonly userID: string,
    public readonly rate: number,
    public readonly type: string
  ) {}
}

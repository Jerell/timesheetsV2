export class SetWorkerRateCommand {
  constructor(
    public readonly taskID: string,
    public readonly userID: string,
    public readonly rate: number,
  ) {}
}

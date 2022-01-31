export class AddedWorkerEvent {
  constructor(
    public readonly taskID: string,
    public readonly userID: string,
    public readonly type: string,
  ) {}
}

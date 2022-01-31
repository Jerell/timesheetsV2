export class SettedParentTaskEvent {
  constructor(
    public readonly taskID: string,
    public readonly parentTaskID: string,
    public readonly type: string,
  ) {}
}

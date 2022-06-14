export class SetParentTaskCommand {
  constructor(
    public readonly taskID: string,
    public readonly parentTaskID: string
  ) {}
}

export class SettedParentTaskEvent {
  constructor(
    public readonly taskID: string,
    public readonly parentTaskID: string
  ) {
    console.log('yah');
  }
}

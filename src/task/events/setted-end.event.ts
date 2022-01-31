export class SettedEndEvent {
  constructor(
    public readonly taskID: string,
    public readonly day: string,
    public readonly type: string,
  ) {}
}

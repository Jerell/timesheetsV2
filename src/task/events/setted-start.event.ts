export class SettedStartEvent {
  constructor(
    public readonly taskID: string,
    public readonly day: string,
    public readonly type: string
  ) {}
}

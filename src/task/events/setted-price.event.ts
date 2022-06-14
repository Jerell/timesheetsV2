export class SettedPriceEvent {
  constructor(
    public readonly taskID: string,
    public readonly thing: string,
    public readonly price: number,
    public readonly type: string
  ) {}
}

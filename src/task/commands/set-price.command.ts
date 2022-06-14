export class SetPriceCommand {
  constructor(
    public readonly taskID: string,
    public readonly thing: string,
    public readonly price: number
  ) {}
}

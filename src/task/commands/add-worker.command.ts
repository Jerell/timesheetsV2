export class AddWorkerCommand {
  constructor(public readonly taskID: string, public readonly userID: string) {}
}

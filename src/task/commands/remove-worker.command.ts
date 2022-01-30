export class RemoveWorkerCommand {
  constructor(public readonly taskID: string, public readonly userID: string) {}
}

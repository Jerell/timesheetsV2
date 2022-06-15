export class EventDTO {
  taskID: string;
  type: string;
  payload: Record<string, unknown> = {};
}

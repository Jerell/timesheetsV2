import { Injectable } from '@nestjs/common';
import initKey from 'src/common/initKey';
import { Event } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';
import { Task } from './task.model';

@Injectable()
export class ReadService {
  constructor(private readonly eventService: EventService) {}

  private tasks: Task[];

  private getTask(taskID: string) {
    return this.tasks.find((task) => task.id === taskID);
  }

  async read() {
    this.tasks = [];
    const events = (await this.eventService.findAll()).entries;
    const grouped = events.reduce((acc, event) => {
      initKey(acc, event.type, []);
      acc[event.type].push(event);
      return acc;
    }, {});
    console.log(grouped);

    const processOrder = [
      'createTask',
      'setProject',
      'setStart',
      'setEnd',
      'addWorker',
      'removeWorker',
      'setRate',
      'recordTime',
      'setPrice',
      'addExpense',
    ];

    const processEvent = (event: Event) => {
      let task: Task;
      let eventCausedAction = false;
      const payload = JSON.parse(event.payload);
      const warnNothingHappened = () =>
        console.log(`WARNING: event did not trigger an action`, event);

      const eventAction = (event: () => void) => {
        eventCausedAction = true;
        event();
      };

      const eventMap = {
        setProject: eventAction(() => this.getTask(payload.parentTaskID)),
        setStart: eventAction(() => task.setStart(payload.day)),
        setEnd: eventAction(() => task.setEnd(payload.day)),
        addWorker: eventAction(() => task.addWorker(payload.userID)),
        removeWorker: eventAction(() => task.removeWorker(payload.userID)),
        setRate: eventAction(() =>
          task.setWorkerRate(payload.userID, payload.rate)
        ),
        recordTime: eventAction(() =>
          task.recordTime(payload.userID, payload.n, payload.day)
        ),
        setPrice: eventAction(() =>
          task.setPrice(payload.thing, payload.price)
        ),
        addExpense: eventAction(() =>
          task.addExpense(payload.thing, payload.quantity, payload.day)
        ),
      };

      if (event.type === 'createTask') {
        task = new Task(event.taskID);
        task.setStart(payload.start);
        task.setEnd(payload.end);
        this.tasks.push(task);
      } else {
        task = this.getTask(event.taskID);
        eventMap[event.type]();
      }

      if (!eventCausedAction) warnNothingHappened();
    };

    for (const step of processOrder) {
      const batch = grouped[step];
      if (!batch) continue;

      for (const event of batch) {
        processEvent(event);
      }
    }

    console.log(this.tasks);
    return this.tasks;
  }
}

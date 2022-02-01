import { Injectable } from '@nestjs/common';
import { IDay } from 'src/common/daynum';
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
      let payload = JSON.parse(event.payload);
      let task: Task;

      if (event.type === 'createTask') {
        task = new Task(event.taskID);
        task.setStart(payload.start);
        task.setEnd(payload.end);
        this.tasks.push(task);
      } else {
        task = this.getTask(event.taskID);

        switch (event.type) {
          case 'setProject':
            const project = this.getTask(payload.parentTaskID);
            task.parent = project;
            break;
          case 'setStart':
            task.setStart(payload.day);
            break;
          case 'setEnd':
            task.setEnd(payload.day);
            break;
          case 'addWorker':
            task.addWorker(payload.userID);
            break;
          case 'removeWorker':
            task.removeWorker(payload.userID);
            break;
          case 'setRate':
            task.setWorkerRate(payload.userID, payload.rate);
            break;
          case 'recordTime':
            task.recordTime(payload.userID, payload.n, payload.day);
            break;
          case 'setPrice':
            task.setPrice(payload.thing, payload.price);
            break;
          case 'addExpense':
            task.addExpense(payload.thing, payload.quantity, payload.day);
            break;
        }
      }
    };

    for (const step of processOrder) {
      const batch = grouped[step];
      if (!batch) continue;

      for (let event of batch) {
        processEvent(event);
      }
    }

    console.log(this.tasks);
    return this.tasks;
  }
}

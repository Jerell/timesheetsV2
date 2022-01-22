import { Injectable } from '@nestjs/common';
import { IDay, DayNum } from './daynum.service';
import { IPerson, Person } from './person.service';
import { Summer } from './summer.service';
import initKey from './utils/initKey';

interface ITask {
  id: string;
  hours: Summer;
  cost: Summer;
  workLog: {
    [person: string]: IPerson;
  };
  recordTime: (id: string, n: number, day: IDay) => void;
}

@Injectable()
export class Task implements ITask {
  public id: string;
  public hours: Summer;
  public cost: Summer;
  public workLog: { [person: string]: IPerson };
  public rates: { [person: string]: number };

  constructor(id: string) {
    this.id = id;
    this.hours = new Summer();
    this.cost = new Summer();
    this.workLog = {};
    this.rates = {};
  }

  recordTime(id: string, n: number, day: IDay) {
    initKey(this.rates, id);
    initKey(this.workLog, id, new Person(id));
    this.workLog[id].rate = this.rates[id];

    const h = new DayNum(n, day);
    const c = new DayNum(n * this.rates[id], day);
    this.hours.add(h);
    this.cost.add(c);

    this.workLog[id].recordTime(n, day);
  }
}

import { IDay, DayNum } from '../../common/daynum';
import { IPerson, Person } from '../../person/person';
import { Summer } from '../../common/summer';
import initKey from '../../common/initKey';
import { AggregateRoot } from '@nestjs/cqrs';
import { RecordedTimeEvent } from '../events/recorded-time.event';

export class Task extends AggregateRoot {
  public id: string;
  public hours: Summer;
  public cost: Summer;
  public workLog: { [person: string]: IPerson };
  public rates: { [person: string]: number };
  public expenses: {
    [thing: string]: {
      quantity: Summer;
      cost: Summer;
    };
  };
  public parent?: Task;
  public budget: {
    hours: Summer;
    cost: Summer;
  };
  public workers: string[];
  public start?: IDay;
  public end?: IDay;

  constructor(id: string) {
    super();

    this.id = id;
    this.hours = new Summer();
    this.cost = new Summer();
    this.workLog = {};
    this.rates = {};
    this.expenses = {};
    this.budget = {
      hours: new Summer(),
      cost: new Summer(),
    };
    this.workers = [];
  }

  setID(id: string) {
    this.id = id;
  }

  addWorker(userID: string) {
    if (!this.workers.includes(userID)) this.workers.push(userID);
    this.parent?.addWorker(userID);
  }

  removeWorker(userID: string) {
    if (this.workers.includes(userID)) {
      const index = this.workers.indexOf(userID);
      this.workers.splice(index, 1);
    }
  }

  recordTime(userID: string, n: number, day: IDay) {
    const h = new DayNum(n, day);
    const c = new DayNum(n * this.rates[userID], day);

    const record = (t: Task) => {
      if (!t) return;

      initKey(t.rates, userID);
      initKey(t.workLog, userID, new Person(userID));
      t.workLog[userID].rate = t.rates[userID];

      t.hours.add(h);
      t.cost.add(c);
      t.workLog[userID].recordTime(n, day);

      t.apply(new RecordedTimeEvent(t.id, userID, n, day, 'recordTime'));
    };
    record(this);
    record(this.parent);
  }

  addExpense(thing: string, price: number, quantity: number, day: IDay) {
    const q = new DayNum(quantity, day);
    const c = new DayNum(quantity * price, day);

    const record = (t: Task) => {
      if (!t) return;
      initKey(t.expenses, thing, {
        quantity: new Summer(),
        cost: new Summer(),
      });
      t.expenses[thing].quantity.add(q);
      t.expenses[thing].cost.add(c);
      t.cost.add(c);
    };

    record(this);
    record(this.parent);
  }

  addBudget(type: 'hours' | 'cost', n: number, day: IDay) {
    const b = new DayNum(n, day);
    this.budget[type].add(b);
    this.parent?.budget[type].add(b);
  }

  markDay(day: IDay) {
    this.addBudget('hours', 0, day);
    this.addBudget('cost', 0, day);
  }

  setStart(day: IDay) {
    this.start = day;
  }

  setEnd(day: IDay) {
    this.end = day;
  }
}

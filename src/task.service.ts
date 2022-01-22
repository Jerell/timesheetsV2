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
  rates: { [person: string]: number };
  expenses: {
    [thing: string]: {
      quantity: Summer;
      cost: Summer;
    };
  };
  recordTime: (id: string, n: number, day: IDay) => void;
  addExpense: (
    thing: string,
    price: number,
    quantity: number,
    date: IDay,
  ) => void;
  parent?: ITask;
}

@Injectable()
export class Task implements ITask {
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
  public parent?: ITask;

  constructor(id: string) {
    this.id = id;
    this.hours = new Summer();
    this.cost = new Summer();
    this.workLog = {};
    this.rates = {};
    this.expenses = {};
  }

  recordTime(id: string, n: number, day: IDay) {
    const h = new DayNum(n, day);
    const c = new DayNum(n * this.rates[id], day);

    const record = (t: ITask) => {
      if (!t) return;

      initKey(t.rates, id);
      initKey(t.workLog, id, new Person(id));
      t.workLog[id].rate = t.rates[id];

      t.hours.add(h);
      t.cost.add(c);
      t.workLog[id].recordTime(n, day);
    };
    record(this);
    record(this.parent);
  }

  addExpense(thing: string, price: number, quantity: number, day: IDay) {
    const q = new DayNum(quantity, day);
    const c = new DayNum(quantity * price, day);

    const record = (t: ITask) => {
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
}

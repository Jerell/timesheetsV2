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

  constructor(id: string) {
    this.id = id;
    this.hours = new Summer();
    this.cost = new Summer();
    this.workLog = {};
    this.rates = {};
    this.expenses = {};
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

  addExpense(thing: string, price: number, quantity: number, day: IDay) {
    initKey(this.expenses, thing, {
      quantity: new Summer(),
      cost: new Summer(),
    });

    const q = new DayNum(quantity, day);
    const c = new DayNum(quantity * price, day);

    this.expenses[thing].quantity.add(q);
    this.expenses[thing].cost.add(c);
    this.cost.add(c);
  }
}

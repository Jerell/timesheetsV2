import { DayNum, IDay } from '../common/daynum';
import { Summer } from '../common/summer';

export interface IPerson {
  id: string;
  rate: number;
  hours: Summer;
  cost: Summer;
  recordTime: (n: number, day: IDay) => void;
}

export class Person implements IPerson {
  public id: string;
  public rate: number;
  public hours: Summer;
  public cost: Summer;

  constructor(id: string) {
    this.id = id;
    this.rate = 0;
    this.hours = new Summer();
    this.cost = new Summer();
  }

  recordTime(n: number, day: IDay) {
    const h = new DayNum(n, day);
    const c = new DayNum(n * this.rate, day);

    this.hours.add(h);
    this.cost.add(c);
  }
}

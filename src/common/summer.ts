import { DayNum, IDay, IDayNum } from './daynum';
import initKey from './initKey';

interface IDayTotal {
  [day: string]: number;
}

export class Summer {
  public total: number;
  public totals: {
    daily: IDayTotal;
    weekly: IDayTotal;
  };

  constructor() {
    this.total = 0;
    this.totals = {
      daily: {},
      weekly: {},
    };
  }

  add(daynum: IDayNum) {
    // if (!daynum.num) return;

    this.total += daynum.num;

    initKey(this.totals.daily, daynum.day);
    initKey(this.totals.weekly, daynum.week);

    this.totals.daily[daynum.day] += daynum.num;
    this.totals.weekly[daynum.week] += daynum.num;
  }

  sumBefore(end: IDay): number {
    return Object.keys(this.totals.daily).reduce((acc: number, day: IDay) => {
      const dn = new DayNum(this.totals.daily[day], day);
      if (dn.isBefore(new Date(end))) {
        acc += this.totals.daily[day];
      }
      return acc;
    }, 0);
  }

  before(end: IDay): Summer {
    return Object.keys(this.totals.daily).reduce((acc: Summer, day: IDay) => {
      const dn = new DayNum(this.totals.daily[day], day);
      if (dn.isBefore(new Date(end))) {
        acc.add(dn);
      }
      return acc;
    }, new Summer());
  }

  after(start: IDay): Summer {
    return Object.keys(this.totals.daily).reduce((acc: Summer, day: IDay) => {
      const dn = new DayNum(this.totals.daily[day], day);
      if (dn.isAfter(new Date(start))) {
        acc.add(dn);
      }
      return acc;
    }, new Summer());
  }

  get cumulative() {
    let runningTotal = 0;
    return Object.keys(this.totals.daily)
      .sort()
      .reduce((acc: Summer, day: IDay) => {
        runningTotal += this.totals.daily[day];
        acc.add(new DayNum(runningTotal, day));
        return acc;
      }, new Summer());
  }
}

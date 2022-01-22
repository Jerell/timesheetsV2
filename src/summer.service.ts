import { Injectable } from '@nestjs/common';
import { DayNum, IDay, IDayNum } from './daynum.service';
import initKey from './utils/initKey';

interface IDayTotal {
  [day: string]: number;
}

@Injectable()
export class Summer {
  public total: number;
  public dayTotals: IDayTotal;
  public weekTotals: IDayTotal;
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
    if (!daynum.num) return;

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
}

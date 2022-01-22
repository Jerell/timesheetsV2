import { Injectable } from '@nestjs/common';
import { IDayNum } from './daynum.service';
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
    this.total += daynum.num;

    initKey(this.totals.daily, daynum.day);
    initKey(this.totals.weekly, daynum.week);

    this.totals.daily[daynum.day] += daynum.num;
    this.totals.weekly[daynum.week] += daynum.num;
  }
}

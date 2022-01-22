import { Injectable } from '@nestjs/common';
import { format, getDay, add } from 'date-fns';

export interface IDayNum {
  day: string;
  week: string;
  num: number;
}

@Injectable()
export class DayNum implements IDayNum {
  private date: Date;
  public readonly day: string;
  public readonly week: string;
  public readonly num: number;

  constructor(num: number, day?: string) {
    this.num = num;
    if (day) {
      this.day = day;
      this.date = new Date(day);
    } else {
      this.date = new Date();
      this.day = format(this.date, 'yyyy-MM-dd');
    }

    const endDay = 5; // friday
    const weekday = getDay(this.date);
    const dist = (7 + endDay - weekday) % 7;
    this.week = format(add(this.date, { days: dist }), 'yyyy-MM-dd');
  }
}

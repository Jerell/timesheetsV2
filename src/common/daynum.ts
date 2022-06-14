import {
  format,
  getDay,
  add,
  isBefore,
  isAfter,
  addMilliseconds,
} from 'date-fns';

export type IDay = `20${'2' | '3'}${number}-${
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'}-${
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'
  | '25'
  | '26'
  | '27'
  | '28'
  | '29'
  | '30'
  | '31'}`;

export interface IDayNum {
  day: IDay;
  week: string;
  num: number;
}

export class DayNum implements IDayNum {
  private date: Date;
  public readonly day: IDay;
  public readonly week: string;
  public readonly num: number;
  private readonly timezoneOffsetMs: number =
    new Date().getTimezoneOffset() * 1000 * 60;

  constructor(num: number, day?: IDay) {
    this.num = num;
    if (day) {
      this.day = day;

      this.date = addMilliseconds(new Date(day), this.timezoneOffsetMs);
    } else {
      this.date = addMilliseconds(new Date(), this.timezoneOffsetMs);
      this.day = format(this.date, 'yyyy-MM-dd') as IDay;
    }

    const endDay = 5; // friday
    const weekday = getDay(this.date);
    const dist = (7 + endDay - weekday) % 7;
    this.week = format(add(this.date, { days: dist }), 'yyyy-MM-dd');
  }

  isBefore(date: Date) {
    date = addMilliseconds(date, this.timezoneOffsetMs);
    return isBefore(this.date, date);
  }

  isAfter(date: Date) {
    date = addMilliseconds(date, this.timezoneOffsetMs);
    return isAfter(this.date, date);
  }
}

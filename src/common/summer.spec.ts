import { Summer } from './summer';
import { DayNum } from './daynum';

describe('add()', () => {
  it('increases the total', () => {
    const dn = new DayNum(3, '2022-01-22');
    const sum = new Summer();

    sum.add(dn);
    expect(sum.total).toBe(dn.num);

    sum.add(dn);
    expect(sum.total).toBe(2 * dn.num);
  });

  it('increases the total for the day', () => {
    const dn = new DayNum(3, '2022-01-22');
    const sum = new Summer();

    sum.add(dn);
    expect(sum.totals.daily['2022-01-22']).toBe(dn.num);

    sum.add(dn);
    expect(sum.totals.daily['2022-01-22']).toBe(2 * dn.num);
  });

  it('increases the total for the week', () => {
    const dn = new DayNum(3, '2022-01-22');
    const sum = new Summer();

    sum.add(dn);
    expect(sum.totals.weekly['2022-01-28']).toBe(dn.num);

    sum.add(dn);
    expect(sum.totals.weekly['2022-01-28']).toBe(2 * dn.num);
  });
});

describe('sumBefore()', () => {
  it('returns the total before a given day', () => {
    const dn1 = new DayNum(3, '2022-01-22');
    const dn2 = new DayNum(4, '2022-01-23');
    const hours = new Summer();

    hours.add(dn1);
    hours.add(dn2);

    expect(hours.sumBefore('2022-01-23')).toBe(dn1.num);
  });
});

describe('before()', () => {
  it('returns a new Summer with only the values before a given day', () => {
    const dn1 = new DayNum(3, '2022-01-22');
    const dn2 = new DayNum(4, '2022-01-23');
    const hours = new Summer();

    hours.add(dn1);
    hours.add(dn2);

    const before23 = hours.before('2022-01-23');

    expect(before23.total).toBe(dn1.num);
  });
});

describe('after()', () => {
  it('returns a new Summer with only the values before a given day', () => {
    const dn1 = new DayNum(3, '2022-01-22');
    const dn2 = new DayNum(4, '2022-01-23');
    const hours = new Summer();

    hours.add(dn1);
    hours.add(dn2);

    const after22 = hours.after('2022-01-22');

    expect(after22.total).toBe(dn2.num);
  });
});

describe('cumulative', () => {
  it('should return a cumulative series of values', () => {
    const dn1 = new DayNum(3, '2022-01-22');
    const dn2 = new DayNum(4, '2022-01-23');
    const hours = new Summer();

    hours.add(dn1);
    hours.add(dn2);

    expect(hours.cumulative.totals.daily['2022-01-22']).toBe(3);
    expect(hours.cumulative.totals.daily['2022-01-23']).toBe(7);
  });
});

import { Summer } from './summer.service';
import { DayNum } from './daynum.service';

describe('add', () => {
  it('increases the total', () => {
    const dn = new DayNum(3, '2022-01-22');
    const sum = new Summer();

    sum.add(dn);
    expect(sum.total).toBe(3);

    sum.add(dn);
    expect(sum.total).toBe(6);
  });

  it('increases the total for the day', () => {
    const dn = new DayNum(3, '2022-01-22');
    const sum = new Summer();

    sum.add(dn);
    expect(sum.totals.daily['2022-01-22']).toBe(3);

    sum.add(dn);
    expect(sum.totals.daily['2022-01-22']).toBe(6);
  });

  it('increases the total for the week', () => {
    const dn = new DayNum(3, '2022-01-22');
    const sum = new Summer();

    sum.add(dn);
    expect(sum.totals.weekly['2022-01-28']).toBe(3);

    sum.add(dn);
    expect(sum.totals.weekly['2022-01-28']).toBe(6);
  });
});

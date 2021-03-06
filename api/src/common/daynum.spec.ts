import { DayNum } from './daynum';

describe('end', () => {
  it('returns the correct end date (saturday)', () => {
    const dn = new DayNum(9, '2022-01-22');
    expect(dn.week).toBe('2022-01-28');
  });

  it('returns the correct end date (friday)', () => {
    const dn = new DayNum(9, '2022-01-21');
    expect(dn.week).toBe('2022-01-21');
  });
});

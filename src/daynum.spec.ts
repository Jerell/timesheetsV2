import { Test } from '@nestjs/testing';
import { DayNum } from './daynum.service';

describe('end', () => {
  it('returns the correct end date', () => {
    const dn = new DayNum(9, '2022-01-23');
    console.log(dn);

    expect(dn.end).toBe('2022-01-28');
  });
});

import { Person } from './person';

describe('recordTime', () => {
  it('calculates cost total', () => {
    const jim = new Person('jim');
    jim.rate = 50;
    jim.recordTime(5, '2022-01-22');
    jim.recordTime(3, '2022-01-22');
    jim.recordTime(2, '2022-02-22');

    expect(jim.cost.total).toBe(500);
    expect(jim.cost.sumBefore('2022-02-01')).toBe(400);
  });
});

import { Task } from './task.service';

describe('totals - two workers', () => {
  it('should calculate the totals multiple workers', () => {
    const job = new Task('taskname');

    job.rates['jim'] = 5;
    job.rates['jom'] = 2;

    job.recordTime('jim', 6, '2022-01-22');
    job.recordTime('jom', 1, '2022-01-22');

    expect(job.cost.total).toBe(32);
    expect(job.workLog['jim'].hours.total).toBe(6);
    expect(job.workLog['jom'].hours.total).toBe(1);
    expect(job.workLog['jim'].cost.total).toBe(30);
    expect(job.workLog['jom'].cost.total).toBe(2);
  });
});

describe('expenses', () => {
  it('should set the cost totals appropriately', () => {
    const job = new Task('taskname');

    job.addExpense('OLGA', 19060, 0.5, '2022-01-22');
    expect(job.expenses['OLGA'].cost.total).toBe(0.5 * 19060);
    expect(job.cost.total).toBe(0.5 * 19060);

    job.addExpense('OLGA', 19060, 1, '2022-01-23');
    expect(job.cost.total).toBe(1.5 * 19060);
    expect(job.expenses['OLGA'].cost.total).toBe(1.5 * 19060);

    expect(job.cost.before('2022-01-23').total).toBe(0.5 * 19060);
    expect(job.expenses['OLGA'].cost.before('2022-01-23').total).toBe(
      0.5 * 19060,
    );
  });
});

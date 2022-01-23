import { Task } from './task';

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

describe('parent', () => {
  it('should group the hours and costs of child tasks', () => {
    const project = new Task('HYN09');
    const ws7 = new Task('WS7');
    const ws8 = new Task('WS8');

    ws7.parent = project;
    ws8.parent = project;

    ws7.addExpense('OLGA', 19060, 0.5, '2022-01-22');
    expect(ws7.expenses['OLGA'].cost.total).toBe(0.5 * 19060);
    expect(ws8.cost.total).toBe(0);
    expect(project.expenses['OLGA'].cost.total).toBe(0.5 * 19060);

    ws8.rates['jim'] = 5;
    ws8.rates['jom'] = 2;

    ws8.recordTime('jim', 6, '2022-01-22');
    ws8.recordTime('jom', 1, '2022-01-22');

    expect(ws8.cost.total).toBe(32);
    expect(project.cost.total).toBe(32 + 0.5 * 19060);
    expect(project.hours.total).toBe(7);
    expect(ws8.hours.total).toBe(7);
    expect(ws7.hours.total).toBe(0);
  });
});

describe('addBudget', () => {
  it('should increase the budget appropriately', () => {
    const project = new Task('HYN09');
    const ws7 = new Task('WS7');
    const ws8 = new Task('WS8');

    ws7.parent = project;
    ws8.parent = project;

    ws7.addBudget('hours', 250, '2022-02-28');
    expect(ws7.budget.hours.total).toBe(250);

    ws8.addBudget('hours', 30, '2022-03-31');
    expect(ws8.budget.hours.total).toBe(30);

    expect(project.budget.hours.total).toBe(280);
  });
});

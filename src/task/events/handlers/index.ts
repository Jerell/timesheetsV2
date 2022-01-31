import { AddedExpenseHandler } from './added-expense.handler';
import { RecordedTimeHandler } from './recorded-time.handler';
import { RemovedWorkerHandler } from './removed-worker.handler';
import { SettedEndHandler } from './setted-end.handler';
import { SettedParentTaskHandler } from './setted-parent-task.handler';
import { SettedPriceHandler } from './setted-price.handler';
import { SettedStartHandler } from './setted-start.handler';
import { SettedWorkerRateHandler } from './setted-worker-rate.handler';

export default [
  AddedExpenseHandler,
  RecordedTimeHandler,
  RemovedWorkerHandler,
  SettedEndHandler,
  SettedParentTaskHandler,
  SettedPriceHandler,
  SettedStartHandler,
  SettedWorkerRateHandler,
];

import { AddExpenseHandler } from './add-expense.handler';
import { RecordTimeHandler } from './record-time.handler';
import { RemoveWorkerHandler } from './remove-worker.handler';
import { SetEndHandler } from './set-end.handler';
import { SetParentTaskHandler } from './set-parent-task.handler';
import { SetPriceHandler } from './set-price.handler';
import { SetStartHandler } from './set-start.handler';
import { SetWorkerRateHandler } from './set-worker-rate.handler';

export default [
  AddExpenseHandler,
  RecordTimeHandler,
  RemoveWorkerHandler,
  SetEndHandler,
  SetParentTaskHandler,
  SetPriceHandler,
  SetStartHandler,
  SetWorkerRateHandler,
];

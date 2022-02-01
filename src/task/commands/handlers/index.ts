import { AddExpenseHandler } from './add-expense.handler';
import { AddWorkerHandler } from './add-worker.handler';
import { CreateTaskHandler } from './create-task.handler';
import { RecordTimeHandler } from './record-time.handler';
import { RemoveWorkerHandler } from './remove-worker.handler';
import { SetEndHandler } from './set-end.handler';
import { SetParentTaskHandler } from './set-parent-task.handler';
import { SetPriceHandler } from './set-price.handler';
import { SetStartHandler } from './set-start.handler';
import { SetWorkerRateHandler } from './set-worker-rate.handler';

export default [
  CreateTaskHandler,
  SetParentTaskHandler,
  SetStartHandler,
  SetEndHandler,
  AddWorkerHandler,
  RemoveWorkerHandler,
  SetWorkerRateHandler,
  RecordTimeHandler,
  SetPriceHandler,
  AddExpenseHandler,
];

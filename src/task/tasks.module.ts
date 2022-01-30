import { AzureTableStorageModule } from '@nestjs/azure-database';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { IsExistingTaskConstraint } from 'src/common/validation/is-existing-task';
import { IsUserAssignedToTaskConstraint } from 'src/common/validation/is-user-assigned-to-task';
import {
  IsRegistered,
  IsRegisteredConstraint,
} from 'src/common/validation/isRegistered';
import { EventService } from 'src/event/event.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AddWorkerHandler } from './commands/handlers/add-worker.handler';
import { CreateTaskHandler } from './commands/handlers/create-task.handler';
import { RecordTimeHandler } from './commands/handlers/record-time.handler';
import { AddedWorkerHandler } from './events/handlers/added-worker.handler';
import { CreatedTaskHandler } from './events/handlers/created-task.handler';
import { RecordedTimeHandler } from './events/handlers/recorded-time.handler';
import { TaskRepository } from './repository/task.repository';
import { TaskController } from './task.controller';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SetParentTaskHandler } from './commands/handlers/set-parent-task.handler';
import { SettedParentTaskHandler } from './events/handlers/setted-parent-task.handler';
import { RemoveWorkerHandler } from './commands/handlers/remove-worker.handler';
import { RemovedWorkerHandler } from './events/handlers/removed-worker.handler';

const CommandHandlers = [
  RecordTimeHandler,
  CreateTaskHandler,
  AddWorkerHandler,
  SetParentTaskHandler,
  RemoveWorkerHandler,
];
const EventHandlers = [
  RecordedTimeHandler,
  CreatedTaskHandler,
  AddedWorkerHandler,
  SettedParentTaskHandler,
  RemovedWorkerHandler,
];

const storage = [
  AzureTableStorageModule.forFeature(Event, {
    table: 'events2',
    createTableIfNotExists: true,
  }),
  AzureTableStorageModule.forFeature(User, {
    table: 'users2',
    createTableIfNotExists: true,
  }),
];

const constraints = [
  IsRegisteredConstraint,
  IsUserAssignedToTaskConstraint,
  IsExistingTaskConstraint,
];

@Module({
  imports: [CqrsModule, ...storage],
  controllers: [TasksController, TaskController],
  providers: [
    TasksService,
    TaskRepository,
    ...CommandHandlers,
    ...EventHandlers,
    EventService,
    UserService,
    ...constraints,
  ],
  exports: [TasksService, ...CommandHandlers, ...EventHandlers],
})
export class TasksModule {}

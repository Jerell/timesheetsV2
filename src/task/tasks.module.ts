import { AzureTableStorageModule } from '@nestjs/azure-database';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { IsAssignedToTaskConstraint } from 'src/common/validation/isAssignedToTask';
import {
  IsRegistered,
  IsRegisteredConstraint,
} from 'src/common/validation/isRegistered';
import { EventService } from 'src/event/event.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateTaskHandler } from './commands/handlers/create-task.handler';
import { RecordTimeHandler } from './commands/handlers/record-time.handler';
import { CreatedTaskHandler } from './events/handlers/created-task.handler';
import { RecordedTimeHandler } from './events/handlers/recorded-time.handler';
import { TaskRepository } from './repository/task.repository';
import { TaskController } from './task.controller';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

const CommandHandlers = [RecordTimeHandler, CreateTaskHandler];
const EventHandlers = [RecordedTimeHandler, CreatedTaskHandler];

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

const constraints = [IsRegisteredConstraint, IsAssignedToTaskConstraint];

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

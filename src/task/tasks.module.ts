import { AzureTableStorageModule } from '@nestjs/azure-database';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { IsExistingTaskConstraint } from 'src/common/validation/is-existing-task';
import { IsUserAssignedToTaskConstraint } from 'src/common/validation/is-user-assigned-to-task';
import { IsRegisteredConstraint } from 'src/common/validation/isRegistered';
import { EventService } from 'src/event/event.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { TaskRepository } from './repository/task.repository';
import { TaskController } from './task.controller';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

import CommandHandlers from './commands/handlers';
import EventHandlers from './events/handlers';
import { ReadService } from './models/read.service';

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
    ReadService,
    ...constraints,
  ],
  exports: [TasksService, ...CommandHandlers, ...EventHandlers],
})
export class TasksModule {}

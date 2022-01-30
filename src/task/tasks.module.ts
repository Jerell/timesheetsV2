import { AzureTableStorageModule } from '@nestjs/azure-database';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventService } from 'src/event/event.service';
import { CreateTaskHandler } from './commands/handlers/create-task.handler';
import { RecordTimeHandler } from './commands/handlers/record-time.handler';
import { RecordedTimeHandler } from './events/handlers/recorded-time.handler';
import { RecordedTimeEvent } from './events/recorded-time.event';
import { TaskRepository } from './repository/task.repository';
import { TaskController } from './task.controller';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

const CommandHandlers = [
  RecordTimeHandler,
  RecordedTimeHandler,
  CreateTaskHandler,
];
const EventHandlers = [RecordedTimeEvent];

@Module({
  imports: [
    CqrsModule,
    AzureTableStorageModule.forFeature(Event, {
      table: 'events2',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [TasksController, TaskController],
  providers: [
    TasksService,
    TaskRepository,
    ...CommandHandlers,
    ...EventHandlers,
    EventService,
  ],
  exports: [TasksService, ...CommandHandlers, ...EventHandlers],
})
export class TasksModule {}

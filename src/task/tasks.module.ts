import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController, TaskController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}

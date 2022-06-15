import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { AzureTableStorageModule } from '@nestjs/azure-database';
import { Event } from './event.entity';

@Module({
  imports: [
    AzureTableStorageModule.forFeature(Event, {
      table: 'events',
      createTableIfNotExists: true,
    }),
  ],
  providers: [EventService],
  controllers: [EventController],
})
export class EventsModule {}

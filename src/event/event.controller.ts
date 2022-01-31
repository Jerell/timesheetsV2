import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  UnprocessableEntityException,
  NotFoundException,
  Logger,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { EventDTO } from './event.dto';
import { Event } from './event.entity';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAllEvents() {
    return await this.eventService.findAll();
  }

  @Get(':rowKey')
  async getEvent(@Param('rowKey') rowKey) {
    try {
      return await this.eventService.find(rowKey, new Event());
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post()
  async createEvent(
    @Body()
    eventData: EventDTO,
  ) {
    try {
      const event = new Event(eventData);

      return await this.eventService.createNext(event);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  // probably not needed
  @Put()
  async saveEvent(@Body() eventData: EventDTO) {
    try {
      const event = new Event(eventData);
      const n = (await this.eventService.count()).toString();

      return await this.eventService.update(n, event);
    } catch (error) {
      return await this.createEvent(eventData);
    }
  }

  // probably not needed
  @Delete(':rowKey')
  async deleteEvent(@Param('rowKey') rowKey) {
    try {
      const response = await this.eventService.delete(rowKey, new Event());
      if (response.statusCode === 204) {
        return null;
      } else {
        throw new UnprocessableEntityException(response);
      }
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}

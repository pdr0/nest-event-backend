import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';

import { generateArrayOfObjects } from './utils/utils';
import { UpdateEventDto } from './update-event-dto';
import { Event } from './event.entity';
import { CreateEventDto } from './create-event-dto';
import { eventNames } from 'process';

const randomResult = generateArrayOfObjects(10);

@Controller({ path: '/events' })
export class EveventController {
  private events: Event[] = [];

  @Get()
  findAll() {
    // Return array of objects
    return this.events;
  }

  @Get(':id')
  findOne(@Param('id') id) {
    const event = this.events.find((event) => event.id === parseInt(id));
    return event;
  }

  @Post()
  create(@Body() input: CreateEventDto) {
    const event = {
      ...input,
      when: new Date(input.when),
      id: this.events.length + 1,
    };
    this.events.push(event);
    return event;
  }

  @Patch(':id')
  update(@Param(':id') id, @Body() bodyInput) {
    const index = this.events.findIndex((event) => event.id === parseInt(id));
    let result = {};
    if (index !== -1) {
      this.events[index] = {
        ...this.events[index],
        ...bodyInput,
        when: bodyInput.when
          ? new Date(bodyInput.when)
          : this.events[index].when,
      };
      result = this.events[index];
    }
    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') deleteId) {
    this.events = this.events.filter(
      (event) => event.id !== parseInt(deleteId),
    );
  }
}

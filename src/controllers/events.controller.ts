import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';

import { Event } from '../entities/event.entity';
import { CreateEventDto } from '../dtos/create-event-dto';
import { Repository, MoreThan, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller({ path: '/events' })
export class EveventController {
  private events: Event[] = [];

  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  //FIND ALL
  @Get()
  findAll() {
    return this.repository.find();
  }

  //FIND ALL
  @Get('/practice')
  async practice() {
    return await this.repository.find({
      select: ['id', 'when'],
      where: [
        {
          id: MoreThan(3),
          when: MoreThan(new Date('2021-02-12T13:00:00')),
        },
        { description: Like('%meet%') },
      ],
      take: 2,
      order: {
        id: 'DESC',
      },
    });
  }

  // FIND ONE
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  //CREATE
  @Post()
  async create(@Body() input: CreateEventDto) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
      id: this.events.length + 1,
    });
  }

  // PATCH
  @Patch(':id')
  async update(@Param(':id') id, @Body() bodyInput) {
    const event = await this.repository.findOne(id);
    let result = event;
    if (event !== undefined) {
      result = await this.repository.save({
        ...event,
        ...bodyInput,
        when: bodyInput.when ? new Date(bodyInput.when) : event.when,
      });
    }
    return result;
  }

  // DELETE
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') deleteId) {
    const event = await this.repository.findOne(deleteId);
    await this.repository.remove(event);
  }
}

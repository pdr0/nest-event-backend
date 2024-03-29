import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event-dto';
import { Repository, MoreThan, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateEventDto } from './dto/update-event-dto';

@Controller({ path: '/events' })
export class EveventController {
  private events: Event[] = [];
  private readonly logger = new Logger(EveventController.name);

  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  // FIND ALL
  @Get()
  async findAll() {
    this.logger.log(`Hit the findall methods`);
    const events = await this.repository.find();
    this.logger.debug(`Found ${events.length} events in the system`);
    return events;
  }

  // PRACTICE
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
  async findOne(@Param('id') id: number) {
    this.logger.log(`Event ID ${id}`);
    const event = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException();
    }

    return event;
  }

  //CREATE
  @Post()
  async create(
    @Body()
    input: CreateEventDto,
  ) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
      id: this.events.length + 1,
    });
  }

  // PATCH
  @Patch(':id')
  async update(
    @Param(':id') id,
    @Body()
    bodyInput: UpdateEventDto,
  ) {
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

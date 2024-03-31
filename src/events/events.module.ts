import { Event } from './event.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EveventController } from './events.controller';
import { Attendee } from './attendee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Attendee])],
  controllers: [EveventController],
})
export class EventsModule {}

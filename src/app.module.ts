import { Event } from './entities/event.entity';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EveventController } from './controllers/events.controller';

// OBJECT RELATIONAL MAPPING - ORM
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'nest-events',
      entities: [Event],
      synchronize: true, // Careful with this property and not put it in production
    }),
    TypeOrmModule.forFeature([Event]),
  ],
  controllers: [AppController, EveventController],
  providers: [AppService],
})
export class AppModule {}

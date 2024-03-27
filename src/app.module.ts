import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EveventController } from './events.controller';

@Module({
  imports: [],
  controllers: [AppController, EveventController],
  providers: [AppService],
})
export class AppModule {}

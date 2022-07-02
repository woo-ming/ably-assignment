import { Module } from '@nestjs/common';
import { AppController } from 'src/interface/app/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
})
export class AppModule {}

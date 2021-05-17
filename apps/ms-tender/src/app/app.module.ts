import { Module } from '@nestjs/common';
import {MsCoreModule} from '@cudo/ms-core'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenderModule } from '../tender/tender.module';

@Module({
  imports: [MsCoreModule, TenderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

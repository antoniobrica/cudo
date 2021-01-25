import { Module } from '@nestjs/common';
import { TenderService } from './tender.service';
import { TenderController } from './tender.controller';
@Module({
  imports: [
  ],
  providers: [TenderService],
  controllers: [TenderController],
})
export class TenderModule {}

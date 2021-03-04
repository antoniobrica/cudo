import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BKP } from '../../../entities/bkp.entity';
import { BkpService } from '../service/bkp.service';
import { BkpResolver } from '../resolver/bkp.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([BKP])],
  providers: [BkpService, BkpResolver],
  exports: [BkpService]
})
export class BkpModule {}

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BKP } from '../../../entities/bkp.entity';
import { BkpService } from '../service/bkp.service';
import { BkpResolver } from '../resolver/bkp.resolver';
import { TaskModule } from '../../../task/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([BKP]), TaskModule],
  providers: [BkpService, BkpResolver],
  exports: [BkpService]
})
export class BkpModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BkpEntity } from '../../entities/bkp.entity';
import { ReferenceModule } from '../reference/reference.module';
import { BkpResolver } from './resolver/bkp.resolver';
import { BkpService } from './service/bkp.service';

@Module({
  imports: [TypeOrmModule.forFeature([BkpEntity]), ReferenceModule],
  providers: [BkpResolver, BkpService],
  exports: [BkpResolver, BkpService]
})
export class BkpModule { }

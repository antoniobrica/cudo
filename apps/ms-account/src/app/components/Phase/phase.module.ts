import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhaseEntity } from '../../entities/phase.entity';
import { ReferenceModule } from '../reference/reference.module';
import { PhaseResolver } from './resolver/phase.resolver';
import { PhaseService } from './service/phase.service';


@Module({
  imports: [TypeOrmModule.forFeature([PhaseEntity]), ReferenceModule],
  providers: [PhaseResolver, PhaseService],
  exports: [PhaseResolver, PhaseService]
})
export class PhaseModule { }

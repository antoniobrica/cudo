
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PhasesService } from './service/phases.service';
import { Phases } from '../../entities/phases.entity';
import { PhasesResolver } from './resolver/phases.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Phases])],
  providers: [PhasesService, PhasesResolver],
  exports: [PhasesService]
})
export class PhasesModule {}

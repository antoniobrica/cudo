
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { Phases } from './phases.entity';
import { PhasesService } from './phases.service';
import { PhasesResolver } from './phases.resolver';



@Module({
  imports: [TypeOrmModule.forFeature([Phases])],
  providers: [PhasesService, PhasesResolver],
  exports: [PhasesService]
})
export class PhasesModule {}

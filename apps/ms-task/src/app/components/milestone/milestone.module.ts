import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MileStoneEntity } from '../../entities/milestone.entity';
import TaskFileEntity from '../../entities/task-file.entity';
import { WorkTypeEntity } from '../../entities/workType.entity';
import { ReferenceModule } from '../reference/reference.module';
import { PhasesModule } from '../tasks/module/phases.module';
import { MileStoneResolver } from './resolver/milestone.resolver';
import { MileStoneService } from './service/milestone.service';

@Module({
  imports: [TypeOrmModule.forFeature([MileStoneEntity, WorkTypeEntity, TaskFileEntity]), ReferenceModule, PhasesModule],
  providers: [MileStoneResolver, MileStoneService],
})
export class MileStoneModule { }

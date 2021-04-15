import { Module } from '@nestjs/common';
import { PhasesModule } from './tasks/module/phases.module';
import { TasksModule } from './tasks/tasks.module';
import { ReferenceModule } from './reference/reference.module';
import { BkpModule } from './tasks/module/bkp.module';
import { MileStoneModule } from './milestone/milestone.module';
@Module({
  imports: [TasksModule,ReferenceModule, PhasesModule, BkpModule, MileStoneModule],
  providers: []
})
export class ComponentsModule { }

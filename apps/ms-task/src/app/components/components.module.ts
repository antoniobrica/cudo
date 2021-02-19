import { Module } from '@nestjs/common';
import { PhasesModule } from './tasks/module/phases.module';
import { TasksModule } from './tasks/tasks.module';
import { ReferenceModule } from './reference/reference.module';
@Module({
  imports: [TasksModule,ReferenceModule, PhasesModule],
  providers: []
})
export class ComponentsModule { }

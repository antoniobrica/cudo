import { Module } from '@nestjs/common';
import { PhasesModule } from './tasks/module/phases.module';
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [TasksModule, PhasesModule],
  providers: []
})
export class ComponentsModule { }

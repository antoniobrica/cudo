import { Module } from '@nestjs/common';
import { ProjectTasksModule } from './project-tasks/project-tasks.module';
@Module({
  imports: [ProjectTasksModule],
  providers: []
})
export class ComponentsModule { }

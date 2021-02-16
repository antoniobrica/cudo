import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ReferenceModule } from './reference/reference.module';
@Module({
  imports: [TasksModule, ReferenceModule],
  providers: []
})
export class ComponentsModule { }

import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { ReferenceModule } from './reference/reference.module';
import { WorkTypesModule } from './workTypes/workTypes.module';
@Module({
  imports: [
    ReferenceModule,
    ProjectsModule,
    WorkTypesModule,
  ],
  providers: []
})
export class ComponentsModule { }

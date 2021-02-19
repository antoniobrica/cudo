import { Module } from '@nestjs/common';
import { BuildingTypesModule } from './buildingType/buildingTypes.module';
import { ProjectsModule } from './projects/projects.module';
import { ReferenceModule } from './reference/reference.module';
import { WorkTypesModule } from './workTypes/workTypes.module';
@Module({
  imports: [
    ReferenceModule,
    ProjectsModule,
    WorkTypesModule,
    BuildingTypesModule
  ],
  providers: []
})
export class ComponentsModule { }

import { Module } from '@nestjs/common';
import { CompanyModule } from './companies/company.module';
import { ProjectsModule } from './projects/projects.module';
import { ReferenceModule } from './reference/reference.module';
import { WorkTypesModule } from './workTypes/workTypes.module';
@Module({
  imports: [
    ReferenceModule,
    ProjectsModule,
    WorkTypesModule,
    CompanyModule,
  ],
  providers: []
})
export class ComponentsModule { }

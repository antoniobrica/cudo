import { Module } from '@nestjs/common';
import { CostModule } from './cost/cost.module';
import { ReferenceModule } from './reference/reference.module';

@Module({
  imports: [
    ReferenceModule,
    CostModule
  ],
  providers: []
})
export class ComponentsModule { }

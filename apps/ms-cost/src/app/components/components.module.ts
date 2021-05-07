import { Module } from '@nestjs/common';
import { ReferenceModule } from './reference/reference.module';

@Module({
  imports: [
    ReferenceModule,
  ],
  providers: []
})
export class ComponentsModule { }

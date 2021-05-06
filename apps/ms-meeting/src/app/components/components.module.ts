import { Module } from '@nestjs/common';
import { ReferenceModule } from './reference/reference.module';
import { SessionModule } from './session/session.module';


@Module({
  imports: [
    ReferenceModule,
    SessionModule
  ],
  providers: []
})
export class ComponentsModule { }

import { Module } from '@nestjs/common';
import { MeetingModule } from './meeting/meeting.module';
import { ProtocolModule } from './protocol/protocol.module';
import { ReferenceModule } from './reference/reference.module';
import { SessionModule } from './session/session.module';


@Module({
  imports: [
    ReferenceModule,
    SessionModule,
    MeetingModule,
    ProtocolModule
  ],
  providers: []
})
export class ComponentsModule { }

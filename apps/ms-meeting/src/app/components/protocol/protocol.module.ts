import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MeetingEntity from '../../entities/meeting.entity';
import ProtocolFileEntity from '../../entities/protocol-file.entity';
// import MembersEntity from '../../entities/members.entity';
// import MeetingEntity from '../../entities/meeting.entity';

// import { MeetingResolver } from './resolver/meeting.resolver';
// import { MeetingService } from './service/meeting.service';
// import MeetingFilesEntity from '../../entities/meeting-files.entity';
// import { InvitationMiddleware } from './middleware/invitation.middleware'
import ProtocolEntity from '../../entities/protocol.entity';
import { ProtocolResolver } from './resolver/protocol.resolver';
import { ProtocolService } from './service/protocol.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProtocolEntity,ProtocolFileEntity])],
  providers: [ProtocolService,ProtocolResolver],
})
export class ProtocolModule {} // implements NestModule {
  // configure(meetingContext: MiddlewareConsumer) {
    // meetingContext.apply(InvitationMiddleware)
      // .forRoutes({ path: "*", method: RequestMethod.GET })
  // }
// }

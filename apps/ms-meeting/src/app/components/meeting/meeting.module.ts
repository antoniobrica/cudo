import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MembersEntity from '../../entities/members.entity';
import MeetingEntity from '../../entities/meeting.entity';

import { MeetingResolver } from './resolver/meeting.resolver';
import { MeetingService } from './service/meeting.service';
import MeetingFilesEntity from '../../entities/meeting-files.entity';
import { InvitationMiddleware } from './middleware/invitation.middleware'

@Module({
  imports: [TypeOrmModule.forFeature([MeetingEntity, MeetingFilesEntity, MembersEntity])],
  providers: [MeetingResolver, MeetingService],
  exports: [MeetingService,MeetingModule]
})
export class MeetingModule {} // implements NestModule {
  // configure(meetingContext: MiddlewareConsumer) {
    // console.log('----meeting module--meetingContext--', meetingContext)
    // meetingContext.apply(InvitationMiddleware)
      // .forRoutes({ path: "*", method: RequestMethod.GET })
  // }
// }

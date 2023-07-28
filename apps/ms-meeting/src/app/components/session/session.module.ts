import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AdminEntity from '../../entities/admin.entity';
import MembersEntity from '../../entities/members.entity';
import SessionEntity from '../../entities/session.entity';
import { ReferenceModule } from '../reference/reference.module';
import { SessionResolver } from './resolver/session.resolver';
import { SessionService } from './service/session.service';
import MeetingEntity from '../../entities/meeting.entity';


@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity, AdminEntity,MembersEntity, MeetingEntity]), ReferenceModule],
  providers: [SessionResolver, SessionService],
  // exports: [SessionService]
})
export class SessionModule { }

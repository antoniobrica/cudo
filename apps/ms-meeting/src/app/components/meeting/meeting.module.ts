import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MembersEntity from '../../entities/members.entity';
import MeetingEntity from '../../entities/meeting.entity';
// import { ReferenceModule } from '../reference/reference.module';
import { MeetingResolver } from './resolver/meeting.resolver';
import { MeetingService } from './service/meeting.service';
import MeetingFilesEntity from '../../entities/meeting-files.entity';


@Module({
  // imports: [TypeOrmModule.forFeature([MeetingEntity, MeetingFilesEntity, MembersEntity]), ReferenceModule],
  imports: [TypeOrmModule.forFeature([MeetingEntity, MeetingFilesEntity, MembersEntity])],
  providers: [MeetingResolver, MeetingService],  
})
export class MeetingModule { }

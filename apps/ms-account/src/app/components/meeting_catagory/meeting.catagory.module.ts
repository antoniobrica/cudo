import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingCatagoryEntity } from '../../entities/meeting.catagory.entity';
import { ReferenceModule } from '../reference/reference.module';
import { MeetingCatagoryResolver } from './resolver/catagory.resolver';
import { MeetingCatagoryService } from './service/meeting.catagory.service';


@Module({
  imports: [TypeOrmModule.forFeature([MeetingCatagoryEntity]), ReferenceModule],
  providers: [MeetingCatagoryResolver, MeetingCatagoryService],
  exports: [MeetingCatagoryResolver, MeetingCatagoryService]
})
export class MeetingCatagoryModule { }

import { Field, ObjectType } from '@nestjs/graphql';
// import { ReferenceModel } from '../../reference/model/reference.model';
import { MemberModel } from '../../session/model/member.model';
import { MeetingFilesModel} from './meeting-files.model'

@ObjectType()
export class MeetingModel {
  
  @Field({ nullable: true, description: `This is for company Id` })
  companyId?: string;

  @Field({ nullable: true, description: `This is for project Type Id` })
  projectTypeId?: string;

  @Field({ nullable: true, description: `This is for work Type Id` })
  workTypeId?: string;

  @Field({ nullable: true, description: `This is for Session Id` })
  sessionId?: string;

  @Field({ nullable: true, description: `This is for meeting Id` })
  meetingId?: string;

  @Field({ nullable: true, description: `This is for meeting Title` })
  meetingTitle?: string;

  @Field({ nullable: true, description: `This is for meeting Date` })
  meetingDate?: Date;

  @Field({ nullable: true, description: `This is for meeting Start Time` })
  meetingStartTime?: Date;

  @Field({ nullable: true, description: `This is for meeting End Time` })
  meetingEndTime?: Date;

  @Field({ nullable: true, description: `This is for meeting invited Guests` })
  inviteGuests?: string;

  @Field({ nullable: true, description: `This is for meeting Description` })
  meetingDescription?: string;

  @Field({ nullable: true, description: `This is for protocol Id` })
  protocolId?: string;

  @Field({ nullable: true, description: `This is for protocol title` })
  protocolTitle?: string;

  @Field({ description: `This is for meeting updated at` })
  updatedAt?: Date;

  @Field({ description: `This is for meeting created at` })
  createdAt?: Date;

  @Field({ nullable: true, description: `This is for meeting updated By` })
  updatedBy?: string;

  @Field({ nullable: true, description: `This is for meeting created by` })
  createdBy?: string;

  // @Field()
  // reference?: ReferenceModel

  @Field(type => [MemberModel], { nullable: true })
  members?: MemberModel[]

  @Field(type => [MeetingFilesModel], { nullable: true })
  meetingFiles?: MeetingFilesModel[] 
  
}
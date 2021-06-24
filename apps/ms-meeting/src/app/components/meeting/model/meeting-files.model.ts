import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MeetingFilesModel {

  @Field({ nullable: true, description: `This is for file Id` })
  fileId?: string;

  @Field({ nullable: true, description: `This is for meeting File Id` })
  meetingFileId?: string;

  @Field({ nullable: true, description: `This is for meeting File Title` })
  meetingFileTitle?: string;

}
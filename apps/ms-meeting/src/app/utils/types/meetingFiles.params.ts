import { Field, InputType } from '@nestjs/graphql';

@InputType()
class MeetingFilesParams {
  @Field({ description: `This is for file ID` })
  fileId?: string;

  @Field({ description: `This is for meeting File ID` })
  meetingFileId?: string;

  @Field({ description: `This is for meeting File Title` })
  meetingFileTitle?: string;
}

export default MeetingFilesParams;
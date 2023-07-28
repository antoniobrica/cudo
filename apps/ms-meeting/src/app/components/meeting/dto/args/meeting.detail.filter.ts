import { Field, InputType } from '@nestjs/graphql';

@InputType()
class MeetingDetailFilterParam {

  @Field({ description: `meeting Id` })
  meetingId: string;
}

export default MeetingDetailFilterParam;
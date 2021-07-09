import { Field, InputType } from '@nestjs/graphql';

@InputType()
class MeetingFilterParam {

  // @Field({ description: `meeting Id`, nullable: true })
  // meetingId?: string;

  @Field({ description: `company Id`, nullable: true })
  companyId?: string;

  @Field({ description: `projectType Id`, nullable: true })
  projectTypeId?: string;

  @Field({ description: `workType Id`, nullable: true })
  workTypeId?: string;

  @Field({ description: `sesssion Id`, nullable: true })
  sessionId?: string;

}

export default MeetingFilterParam;
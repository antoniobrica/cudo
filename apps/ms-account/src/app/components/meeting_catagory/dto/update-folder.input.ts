import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMeetingCatagory {
  @Field()
  meetingCatagoryID?: string;
}



import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMeetCatagoryInput {

  @Field({description:'Meeting Catagory Title'})
  meetingCatagoryTitle: string;

}


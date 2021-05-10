import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';

@ObjectType()
export class MeetingCatagoryModel {

  @Field()
  meetingCatagoryID: string;

  @Field()
  meetingCatagoryTitle: string;

  @Field(type => [ReferenceModel])
  references: ReferenceModel[]

}




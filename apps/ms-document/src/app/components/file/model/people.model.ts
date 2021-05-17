import { Field, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';

@ObjectType()
export class PeopleModel {

  @Field({ nullable: true, description: `This is for title task title` })
  userID?: string;

  @Field({ nullable: true, description: `This is for task start date in UTC` })
  userName?: string;

  @Field({ nullable: true, description: `This is for task start date in UTC` })
  imageUrl?: string;

}




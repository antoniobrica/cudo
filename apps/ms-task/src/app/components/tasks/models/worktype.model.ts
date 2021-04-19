import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class WorkTypeModel {

  @Field({ nullable: true, description: `This is for title taskID` })
  workTypeID?: string;

  @Field({ nullable: true, description: `This is for title task title` })
  workTypeTitle?: string;

}




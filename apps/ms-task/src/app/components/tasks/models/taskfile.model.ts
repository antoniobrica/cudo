import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class TaskFileModel {

  @Field({ nullable: true, description: `This is for title taskID` })
  fileID?: string;

  @Field({ nullable: true, description: `This is for title task title` })
  fileName?: string;

  @Field({ nullable: true, description: `This is for title task title` })
  fileUrl?: string;

}




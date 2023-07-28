import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class SubTaskModel {

  @Field({ nullable: true, description: `This is for subtaskID` })
  taskID?: string;

  @Field({ nullable: true, description: `This is for subtaskID` })
  subtaskID?: string;

  @Field({ nullable: true, description: `This is for  subtask title` })
  subtaskTitle?: string;

  @Field({ nullable: true, description: `This is for  subtask title` })
  status?: string;

  @Field({ nullable: true, description: `Task Deleted or not` })
  isDeleted?: Boolean;


}
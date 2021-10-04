import { Field, InputType } from '@nestjs/graphql';
// import { IsString } from 'class-validator';

@InputType()
class CommentsFilterParams {

  @Field({ nullable: true, description: `Task ID` })
  taskID?: string;

  @Field({ nullable: true, description: `Comment ID` })
  commentsID?: string;

}

export default CommentsFilterParams;
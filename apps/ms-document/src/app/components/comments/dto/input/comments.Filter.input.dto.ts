import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
class CommentsFilterParams {

  @Field({ nullable: true, description: `File ID` })
  uploadedFileID?: string;

  @Field({ nullable: true, description: `Comment ID` })
  commentsID?: string;

}

export default CommentsFilterParams;
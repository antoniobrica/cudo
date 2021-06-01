import { Field, InputType } from '@nestjs/graphql';

@InputType()
class TaskFileParams {
  
  @Field({ description: `File ID` })
  fileID?: string;

  @Field({ description: `File Name` })
  fileName?: string;

  @Field({ description: `File Image URL` })
  fileUrl?: string;
}

export default TaskFileParams;
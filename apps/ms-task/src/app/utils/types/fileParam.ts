import { Field, InputType } from '@nestjs/graphql';

@InputType()
class TaskFileParams {
  @Field({ description: `User ID` })
  fileID?: string;

  @Field({ description: `User Name` })
  fileName?: string;

  @Field({ description: `User Name` })
  fileUrl?: string;
}

export default TaskFileParams;
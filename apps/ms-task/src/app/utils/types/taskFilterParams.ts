import { Field, InputType } from '@nestjs/graphql';

@InputType()
class TaskFilterParams {

  @Field({ description: `Task ID` })
  taskID?: string;
}

export default TaskFilterParams;
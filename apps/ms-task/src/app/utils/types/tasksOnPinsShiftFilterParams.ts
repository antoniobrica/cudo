import { Field, InputType } from '@nestjs/graphql';

@InputType()
class TasksOnPinsShiftFilterParams {

  @Field({ description: `Task previous File ID` })
  fileID?: string;
}

export default TasksOnPinsShiftFilterParams;
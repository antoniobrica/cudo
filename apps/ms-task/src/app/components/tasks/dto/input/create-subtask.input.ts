import { Field, InputType } from '@nestjs/graphql';
import { StatusEnum } from 'apps/ms-task/src/app/enums/status.enum';

@InputType()
class SubTaskInput {

  @Field({ description: `subtask Name` })
  subtaskID?: string

  @Field({ description: `subtask Name` })
  subtaskTitle?: string;

  @Field(type => StatusEnum, { description: `SubTask status` })
  status?: StatusEnum;
}

export default SubTaskInput;
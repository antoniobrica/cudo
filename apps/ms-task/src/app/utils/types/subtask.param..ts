import { Field, InputType } from '@nestjs/graphql';
import { StatusEnum } from '../../enums/status.enum';

@InputType()
class SubTaskParams {

  @Field({ description: `subtask Name` })
  subtaskTitle?: string;

  @Field(type => StatusEnum, { description: `SubTask status` })
  status?: StatusEnum;
}

export default SubTaskParams;
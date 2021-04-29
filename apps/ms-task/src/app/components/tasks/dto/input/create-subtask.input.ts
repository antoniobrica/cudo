import { Field, InputType } from '@nestjs/graphql';
import { StatusEnum } from 'apps/ms-task/src/app/enums/status.enum';

@InputType()
class SubTaskInput {


  @Field({ description: `subtask Name`, nullable:true })
  subtaskTitle?: string;

  @Field(type => StatusEnum, { description: `SubTask status`, nullable: true })
  status?: StatusEnum;
}

export default SubTaskInput;
import { Field, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';
import { TaskFileModel } from '../../tasks/models/taskfile.model';
import { WorkTypeModel } from '../../tasks/models/worktype.model';

@ObjectType()
export class MileStoneModel {

  @Field({ nullable: true, description: `This is for title taskID` })
  milestoneID?: string;

  @Field({ nullable: true, description: `This is for title task title` })
  milestoneTitle?: string;

  @Field({ nullable: true, description: `This is for task start date in UTC` })
  dueDate?: Date;

  @Field({ nullable: true, description: `This is for task estimated days in number` })
  description?: string;

  // @Field({ nullable: true, description: `BKPID linked with task` })
  // WorkTypeTitle?: string;

  @Field({ nullable: true, description: `PhaseID linked with task` })
  phasesID?: string;

  @Field({ description: `Task updated at` })
  updatedAt?: Date;

  @Field({ description: `Task created at` })
  createdAt?: Date;

  @Field({ nullable: true, description: `Task updated By` })
  updatedBy?: string;

  @Field({ nullable: true, description: `Task created by` })
  createdBy?: string;

  @Field()
  reference?: ReferenceModel

  @Field(type => [TaskFileModel], { nullable: true })
  files?: TaskFileModel[]

  @Field(type => [WorkTypeModel], { nullable: true })
  worktypes?: WorkTypeModel[]

}




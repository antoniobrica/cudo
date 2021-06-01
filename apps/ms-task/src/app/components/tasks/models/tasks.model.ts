import { Field, ObjectType } from '@nestjs/graphql';
import TaskFileEntity from '../../../entities/task-file.entity';
import { ReferenceModel } from '../../reference/model/reference.model';
import { SubTaskModel } from './subtask.model';
import { TaskFileModel } from './taskfile.model';
import { UserModel } from './user.model';

@ObjectType()
export class TasksModel {

  @Field({ nullable: true, description: `This is for title taskID` })
  taskID?: string;

  @Field({ nullable: true, description: `This is for title task title` })
  taskTitle?: string;

  @Field({ nullable: true, description: `This is for task start date in UTC` })
  startDate?: Date;

  @Field({ nullable: true, description: `This is for task end date in UTC` })
  endDate?: Date;

  @Field({ nullable: true, description: `This is for task estimated days in number` })
  estimatedDays?: string;

  @Field({ nullable: true, description: `This is for sending notification on task created to assignes and followers. True or False` })
  sendNotification?: boolean;

  @Field({ nullable: true, description: `To save task as template. True or False` })
  saveTaskAsTemplate?: string;

  @Field({ nullable: true, description: `BKPID linked with task` })
  BKPID?: string;

  @Field({ nullable: true, description: `PhaseID linked with task` })
  phaseID?: string;

  @Field({ nullable: true, description: `BKPID linked with task` })
  BKPTitle?: string;

  @Field({ nullable: true, description: `PhaseID linked with task` })
  phaseName?: string;

  @Field({ nullable: true, description: `Task Status` })
  status?: string;

  @Field({ nullable: true, description: `Task Deleted or not` })
  isDeleted?: Boolean;

  @Field({ nullable: true, description: `Description of task` })
  description?: string;

  @Field({ nullable: true, description: ` Task ParentID`  })
  fileID?: string;

  @Field({ nullable: true, description: ` Task ParentID`  })
  fileName?: string;

  @Field({ nullable: true, description: ` Task ParentID`  })
  taskTypeID?: string;

  // @Field({ nullable: true, description: ` Task ParentID`  })
  // taskTypeParentID?: string;

  // @Field({ nullable: true, description: ` Task ChileID`  })
  // taskTypeChildID?: string;

  @Field({ nullable: true, description: `Description of task` })
  taskType?: string;

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

  @Field(type => [UserModel], { nullable: true })
  assignees?: UserModel[]

  @Field(type => [UserModel], { nullable: true })
  followers?: UserModel[]

  @Field(type => [TaskFileModel], { nullable: true })
  files?: TaskFileModel[]

  @Field(type => [SubTaskModel], { nullable: true })
  subtasks?: SubTaskModel[]

}
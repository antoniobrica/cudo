import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectTasksModel {
  @Field()
  TaskID: string;

  @Field()
  ParentTaskID?: string;

  @Field()
  ChildTaskID?: string;

  @Field()
  TaskTitle?: string;

  @Field()
  StartDate?: string;

  @Field()
  EndDate?: string;

  @Field()
  EstimatedDays?: string;

  @Field()
  SendNotification?: string;

  @Field()
  SaveTaskAsTemplate?: string;

  @Field()
  BKPID?: string;

  @Field()
  PhasesID?: string;

  @Field()
  CreatedOn?: string;

  @Field()
  CreatedBy?: string;

  @Field()
  UpdatedOn?: number;

  @Field()
  UpdatedBy?: string;

  @Field()
  IsDeleted?: string;

  @Field()
  ReferenceID?: string;

  @Field()
  ReferenceTypeID?: string;

  @Field()
  Status?: string;
}




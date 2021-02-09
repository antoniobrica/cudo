import { BaseEntity, BeforeInsert, Column, Entity, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
@Entity({ name: 'ProjectTasks' })
export class ProjectTasksEntity {
  @Field()
  @Column({ unique: true })
  @PrimaryColumn()
  TaskID: string;

  @Field()
  @Column({ nullable: true })
  ParentTaskID?: string;

  @Field()
  @Column({ nullable: true })
  ChildTaskID?: string;

  @Field()
  @Column({ nullable: true })
  TaskTitle?: string;

  @Field()
  @Column({ nullable: true })
  StartDate?: string;

  @Field()
  @Column({ nullable: true })
  EndDate?: string;

  @Field()
  @Column({ nullable: true })
  EstimatedDays?: string;

  @Field()
  @Column({ nullable: true })
  SendNotification?: string;

  @Field()
  @Column({ nullable: true })
  SaveTaskAsTemplate?: string;

  @Field()
  @Column({ nullable: true })
  BKPID?: string;

  @Field()
  @Column({ nullable: true })
  PhasesID?: string;

  @Field()
  @Column({ nullable: true })
  CreatedOn?: string;

  @Field()
  @Column({ nullable: true })
  CreatedBy?: string;

  @Field()
  @Column({ nullable: true })
  UpdatedOn?: number;

  @Field()
  @Column({ nullable: true })
  UpdatedBy?: string;

  @Field()
  @Column({ nullable: true })
  IsDeleted?: string;

  @Field()
  @Column({ nullable: true })
  ReferenceID?: string;

  @Field()
  @Column({ nullable: true })
  ReferenceTypeID?: string;

  @Field()
  @Column({ nullable: true })
  Status?: string;
}

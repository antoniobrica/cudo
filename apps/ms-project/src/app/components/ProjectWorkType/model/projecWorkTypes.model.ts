import { Field, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { WorkTypeModel } from '../../workTypes/model/workTypes.model';

@ObjectType()
export class ProjectWorkTypeModel {
  @Field()
  projectWorkTypeID: string;

  @Field({ nullable: true })
  workTypeName?: string;

  @Field({ nullable: true })
  workID?: string;

  @Field()
  estimatedCost: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

}




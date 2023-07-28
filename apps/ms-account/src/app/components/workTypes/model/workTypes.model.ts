import { Field, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class WorkTypeModel {
  @Field()
  workTypeID: string;

  @Field()
  workTypeTitle: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  @Field()
  createdBy?: string;

  @Field()
  updatedBy?: string;
}




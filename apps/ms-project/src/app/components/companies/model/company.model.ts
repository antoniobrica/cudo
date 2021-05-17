import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class CompanyModel {
  @Field()
  companyID: string;

  @Field()
  companyName: string;

  @Field()
  companyType: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}




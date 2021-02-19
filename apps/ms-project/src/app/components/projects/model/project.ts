import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class Project {
  @Field()
  projectId: string;

  @Field()
  projectName: string;

  @Field()
  projectNum: string

  @Field()
  client: string;

  @Field({ nullable: true })
  buildingType?: string;

  @Field({ nullable: true })
  printingCom?: string;

  @Field({ nullable: true })
  workType?: string;

  @Field({ nullable: true })
  estCost?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}




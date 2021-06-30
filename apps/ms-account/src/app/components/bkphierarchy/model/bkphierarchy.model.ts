import { Field, ObjectType } from '@nestjs/graphql';
import { BKPChildrenModel } from './bkp-children.model';

@ObjectType()
export class BkpHierarchyModel {

  @Field({ nullable: true, description: `` })
  id: number;

  @Field({ description: `BKP ID` })
  bkpID: string;

  @Field({ description: `BKP Title` })
  bkpTitle: string;

  @Field({ nullable: true, description: `Is BKP for the project deleted ?` })
  isDeleted: Boolean;

  @Field({ nullable: true, description: `Created At` })
  createdAt?: Date;

  @Field({ nullable: true, description: `Creates By` })
  createdBy?: string;

  @Field({ nullable: true, description: `Updated at` })
  updatedAt?: Date;

  @Field({ description: `Updated by` })
  updatedBy?: string;

  @Field(type => [BKPChildrenModel], { nullable: true, description: `BKP Children` })
  children: BKPChildrenModel[];



}




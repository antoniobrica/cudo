import { Field, ObjectType } from '@nestjs/graphql';
import { bkpLayerTwoModel } from './bkp-layerTwo.model';
import { BkpHierarchyModel } from './bkphierarchy.model';

@ObjectType()
export class BkpLayerOneModel {

  @Field({ nullable: true, description: `BKP ID` })
  bkpCostID: string;

  @Field({ nullable: true, description: `BKP ID` })
  BKPID: string;

  @Field({ nullable: true, description: `BKP Title` })
  BKPTitle: string;

  @Field({ nullable: true, description: `if BKP-Cost is Deleted` })
  isDeleted?: boolean;

  @Field({ nullable: true, description: `Created at` })
  createdAt?: Date;

  @Field({ nullable: true, description: `Created By` })
  createdBy?: string;

  @Field({ nullable: true, description: `updated at` })
  updatedAt?: Date;

  @Field({ nullable: true, description: `updated by` })
  updatedBy?: string;

  @Field(type => [bkpLayerTwoModel], { nullable: true, description: `BKP Children ` })
  bkpChildrenLayerTwo: bkpLayerTwoModel[];

  // @Field(type => [BkpHierarchyModel], { nullable: true, description: `BKP Children ` })
  // parent: BkpHierarchyModel[];

}




import { Field, ObjectType } from '@nestjs/graphql';
import { BkpLayerOneModel } from './bkp-layerOne.model';

@ObjectType()
export class BkpHierarchyModel {

  @Field({ nullable: true, description: `` })
  id: number;

  @Field({ description: `BKP Unique ID` })
  bkpCostID: string;

  @Field({ description: `BKP Unique ID` })
  structureID: string;

  @Field({ description: `BKP Unique ID` })
  structureName: string;

  @Field({ description: `BKP ID` })
  BKPID: string;

  @Field({ description: `BKP Title` })
  BKPTitle: string;

  @Field({ nullable: true, description: `Is BKP for the project deleted ?` })
  isDeleted: boolean;

  @Field({ nullable: true, description: `Created At` })
  createdAt?: Date;

  @Field({ nullable: true, description: `Creates By` })
  createdBy?: string;

  @Field({ nullable: true, description: `Updated at` })
  updatedAt?: Date;

  @Field({ description: `Updated by` })
  updatedBy?: string;

  @Field(type => [BkpLayerOneModel], { nullable: true, description: `BKP Children` })
  children: BkpLayerOneModel[];

}




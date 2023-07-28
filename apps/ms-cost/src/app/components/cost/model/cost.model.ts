import { Field, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';
import { BKPCostModel } from './bkp-cost.model';

@ObjectType()
export class CostModel {

  @Field({ nullable: true, description: `` })
  id: number;

  @Field({ nullable: true, description: `CostID UUID` })
  costID: string;

  @Field({ nullable: true, description: `Project Structure ID (House)` })
  structureID: string;

  @Field({ nullable: true, description: `Project Structure name (House)` })
  structureName: string;

  @Field({ nullable: true, description: `Is cost for the project deleted ?` })
  isDeleted: string;

  @Field({ nullable: true, description: `Created At` })
  createdAt?: Date;

  @Field({ nullable: true, description: `Creates By` })
  createdBy?: string;

  @Field({ nullable: true, description: `Updated at` })
  updatedAt?: Date;

  @Field({ description: `Updated by` })
  updatedBy?: string;

  @Field(type => [BKPCostModel], { nullable: true, description: `BKP list with cost and quantity` })
  BKPCosts: BKPCostModel[];

}




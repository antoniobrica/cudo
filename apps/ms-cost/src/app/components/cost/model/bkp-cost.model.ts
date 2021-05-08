import { Field, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';
import { bkpCostFileModel } from './bkp-cost-file.model';

@ObjectType()
export class BKPCostModel {

  @Field({ nullable: true, description: `` })
  id: number;

  @Field({ nullable: true, description: `BKP Cost UUID` })
  bkpCostID: string;

  @Field({ nullable: true, description: `BKP ID` })
  BKPID: string;

  @Field({ nullable: true, description: `BKP Title` })
  BKPTitle: string;

  @Field({ nullable: true, description: `BKP COST Description` })
  description: string;

  @Field({ nullable: true, description: `BKP Quantity` })
  itemQuantity: number;

  @Field({ nullable: true, description: `BKP each item price` })
  itemPrice: number;

  @Field({ nullable: true, description: `BKP total price itemQuantity*itemPrice` })
  itemTotalPrice: number;

  @Field({ nullable: true, description: `Created at` })
  createdAt?: Date;

  @Field({ nullable: true, description: `Created By` })
  createdBy?: string;

  @Field({ nullable: true, description: `updated at` })
  updatedAt?: Date;

  @Field({ nullable: true, description: `updated by` })
  updatedBy?: string;

  @Field(type => [bkpCostFileModel], { nullable: true, description: `Files for each BKP` })
  bkpCostFiles: bkpCostFileModel[];

}




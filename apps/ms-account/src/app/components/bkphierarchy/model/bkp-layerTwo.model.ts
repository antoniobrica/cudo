import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class bkpLayerTwoModel {

  @Field({ nullable: true, description: `BKP ID` })
  bkpCostID: string;

  @Field({ nullable: true, description: `BKP ID` })
  BKPID: string;

  @Field({ nullable: true, description: `BKP Title` })
  BKPTitle: string;

  @Field({ nullable: true, description: `BKP description` })
  description: string;

  @Field({ nullable: true, description: `BKP itemQuantity` })
  itemQuantity: number;

  @Field({ nullable: true, description: `BKP itemPrice` })
  itemPrice: number;

  @Field({ nullable: true, description: `BKP itemTotalPrice` })
  itemTotalPrice: number;

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


}




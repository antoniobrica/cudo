import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class bkpLayerTwoModel {

  @Field({ nullable: true, description: `BKP ID` })
  bkpUID: string;

  @Field({ nullable: true, description: `BKP ID` })
  bkpID: string;

  @Field({ nullable: true, description: `BKP Title` })
  bkpTitle: string;

  @Field({ nullable: true, description: `if BKP-Cost is Deleted` })
  isDeleted?: Boolean;

  @Field({ nullable: true, description: `Created at` })
  createdAt?: Date;

  @Field({ nullable: true, description: `Created By` })
  createdBy?: string;

  @Field({ nullable: true, description: `updated at` })
  updatedAt?: Date;

  @Field({ nullable: true, description: `updated by` })
  updatedBy?: string;


}




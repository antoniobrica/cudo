import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class bkpCostFileModel {

  @Field({ nullable: true, description: `` })
  id: number;

  @Field({ nullable: true, description: `BKP cost file UUID` })
  bkpCostFileID: string;

  @Field({ nullable: true, description: `File URL` })
  uploadedFileID: string;

  @Field({ nullable: true, description: `File title` })
  uploadedFileTitle: string;

  @Field({ nullable: true, description: `Created at` })
  createdAt?: Date;

  @Field({ nullable: true, description: `Created by` })
  createdBy?: string;

  @Field({ nullable: true, description: `Updated at` })
  updatedAt?: Date;

  @Field({ nullable: true, description: `Updated by` })
  updatedBy?: string;

}




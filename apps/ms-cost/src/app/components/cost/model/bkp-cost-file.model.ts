import { Field, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';

@ObjectType()
export class bkpCostFileModel {

  @Field({ nullable: true, description: `` })
  id: number;

  @Field({ nullable: true, description: `BKP cost file UUID` })
  bkpCostFileID: string;

  @Field({ nullable: true, description: `File URL` })
  fileURL: string;

  @Field({ nullable: true, description: `File title` })
  fileTitle: string;

  @Field({ nullable: true, description: `File type` })
  fileType: string;

  @Field({ nullable: true, description: `File version` })
  fileVersion: string;

  @Field({ nullable: true, description: `Created at` })
  createdAt?: Date;

  @Field({ nullable: true, description: `Created by` })
  createdBy?: string;

  @Field({ nullable: true, description: `Updated at` })
  updatedAt?: Date;

  @Field({ nullable: true, description: `Updated by` })
  updatedBy?: string;

}




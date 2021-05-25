import { Field, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';

@ObjectType()
export class PeopleModel {

  @Field({ nullable: true, description: `User asigned UUID` })
  filePeopleID: string;

  @Field({ nullable: true, description: `Use ID` })
  userID?: string;

  @Field({ nullable: true, description: `User Name` })
  userName?: string;

  @Field({ nullable: true, description: `User Image Url` })
  imageUrl?: string;

}




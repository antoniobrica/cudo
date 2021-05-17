import { Field, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';

@ObjectType()
export class UserModel {

  @Field({ nullable: true, description: `User ID` })
  userID?: string;

  @Field({ nullable: true, description: `User Name` })
  userName?: string;

  @Field({ nullable: true, description: `User image` })
  imageUrl?: string;

}




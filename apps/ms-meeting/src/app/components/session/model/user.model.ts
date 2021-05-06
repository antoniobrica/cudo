import { Field, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';

@ObjectType()
export class UserModel {

  @Field({ nullable: true, description: `This is for user ID` })
  adminID?: string;

  @Field({ nullable: true, description: `This is for User Name` })
  adminName?: string;

}




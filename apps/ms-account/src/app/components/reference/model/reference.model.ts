import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../users/model/user.model';

@ObjectType()
export class ReferenceModel {
  @Field({ nullable: true, description: `referenceID` })
  referenceID?: string;

  @Field({ nullable: true, description: `referenceType` })
  referenceType?: string;

  @Field({ nullable: true, description: `referenceType` })
  name?: string;

  @Field({ nullable: true, description: `referenceType` })
  imageUrl?: string;

  @Field({ description: `Reference updated at`, nullable: true })
  updatedAt?: Date;

  @Field({ description: `Reference created at`, nullable: true })
  createdAt?: Date;

  @Field({ nullable: true, description: `Reference updated By` })
  updatedBy?: string;

  @Field({ nullable: true, description: `Reference created by` })
  createdBy?: string;

  @Field((type) => [UserModel])
  users: UserModel[];
}

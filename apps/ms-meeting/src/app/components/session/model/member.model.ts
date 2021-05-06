import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MemberModel {

  @Field({ nullable: true, description: `This is for user ID` })
  memberID?: string;

  @Field({ nullable: true, description: `This is for User Name` })
  memberName?: string;

  @Field({ nullable: true, description: `This is for User Name` })
  image?: string;

}
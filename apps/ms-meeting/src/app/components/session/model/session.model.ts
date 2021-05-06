import { Field, ObjectType } from '@nestjs/graphql';
import { ReferenceModel } from '../../reference/model/reference.model';
import { MemberModel } from './member.model';
import { UserModel } from './user.model';

@ObjectType()
export class SessionModel {

  @Field({ nullable: true, description: `This is for Session ID ` })
  sessionID?: string;

  @Field({ nullable: true, description: `This is for session title` })
  sessionTitle?: string;

  @Field({ nullable: true, description: `Work Type ID` })
  worktypeID?: string;

  @Field({ nullable: true, description: `Work type Title` })
  worktypeTitle?: string;

  @Field({ nullable: true, description: `meeting category ID` })
  meetingCategoryID?: string;

  @Field({ nullable: true, description: `meeting category title` })
  meetingCategoryTitle?: string;

  @Field({ nullable: true, description: `invitation ID` })
  invitationID?: string;

  @Field({ nullable: true, description: `invitation Title` })
  invitationTitle?: string;

  @Field({ nullable: true, description: `protocol ID` })
  protocolID?: string;

  @Field({ nullable: true, description: `protocol title` })
  protocolTitle?: string;

  @Field({ description: `session updated at` })
  updatedAt?: Date;

  @Field({ description: `session created at` })
  createdAt?: Date;

  @Field({ nullable: true, description: `session updated By` })
  updatedBy?: string;

  @Field({ nullable: true, description: `session created by` })
  createdBy?: string;

  @Field()
  reference?: ReferenceModel

  @Field(type => [UserModel], { nullable: true })
  admins?: UserModel[]

  @Field(type => [MemberModel], { nullable: true })
  members?: MemberModel[]

}
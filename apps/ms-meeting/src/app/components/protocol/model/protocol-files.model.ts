import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProtocolFilesModel {

  @Field({ nullable: true, description: `This is for file Id` })
  fileId?: string;

  @Field({ nullable: true, description: `This is for protocol File Id` })
  protocolFileId?: string;

  @Field({ nullable: true, description: `This is for protocol File Title` })
  protocolFileTitle?: string;

}
import { Field, ObjectType } from '@nestjs/graphql';
import { MeetingModel } from '../../meeting/model/meeting.model';
import { ProtocolFilesModel } from './protocol-files.model';

@ObjectType()
export class ProtocolModel {

  @Field({ nullable: true, description: `This is for company Id` })
  public companyId?: string;

  @Field({ nullable: true, description: `This is for project Type Id` })
  public projectTypeId?: string;

  @Field({ nullable: true, description: `This is for work Type Id` })
  public workTypeId?: string;

  @Field({ nullable: true, description: `This is for Session Id` })
  public sessionId?: string;

  @Field({ nullable: true, description: `This is for protocol Id` })
  public protocolId?: string;

  @Field({ nullable: true, description: `This is for protocol Title` })
  public protocolTitle?: string;

  @Field({ nullable: true, description: `This is for protocol Date` })
  public protocolDate?: Date;

  @Field({ nullable: true, description: `This is for protocol Start Time` })
  public protocolStartTime?: Date;

  @Field({ nullable: true, description: `This is for protocol End Time` })
  public protocolEndTime?: Date;

  @Field({ nullable: true, description: `This is for protocol duration Time` })
  public protocolDuration?: string;

  @Field({ nullable: true, description: `This is for protocol Description` })
  public protocolDescription?: string;

  @Field({ nullable: true, description: `This is for protocol created by` })
  public createdBy?: string;

  @Field({ description: `This is for protocol created at` })
  public createdAt?: Date;

  @Field({ nullable: true, description: `This is for protocol updated By` })
  public updatedBy?: string;

  @Field({ description: `This is for protocol updated at` })
  public updatedAt?: Date;

  @Field({ nullable: true, description: `This is for protocol isDeleted` })
  public isDeleted?: boolean;

  // @Field()
  // public reference?: ReferenceModel

  @Field(type => [MeetingModel], { nullable: true })
  public meetings?: MeetingModel[]

  @Field(type => [ProtocolFilesModel], { nullable: true })
  public protocolFiles?: ProtocolFilesModel[]

  @Field({ nullable: true, description: `This is for protocol status` })
  public status?: string;

}
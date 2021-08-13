import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProtocolBasicDetailsInput {

  @Field({ description: `This is for company Id`, nullable: true })
  public companyId?: string;

  @Field({ description: `This is for project Type Id`, nullable: true })
  public projectTypeId?: string;
  
  @Field({ description: `This is for work Type Id`, nullable: true })
  public workTypeId?: string;

  @Field({ description: `This is for session Id`, nullable: true })
  public sessionId?: string;

  @Field({ description: `This is for protocol title`  })
  public protocolTitle: string;
  
  @Field({ description: `This is for protocol Date` })
  public protocolDate: Date;

  @Field({ description: `This is for protocol Start Time` })
  public protocolStartTime: Date;

  @Field({ description: `This is for protocol End Time` })
  public protocolEndTime: Date;

  @Field({ description: `This is for protocol Description`, nullable: true })
  public protocolDescription?: string;

  @Field({ description: `This is for protocol Duration`, nullable: true })
  public protocolDuration: string;

  @Field({ description: `This is for protocol status`, nullable: true })
  public status: string;
}
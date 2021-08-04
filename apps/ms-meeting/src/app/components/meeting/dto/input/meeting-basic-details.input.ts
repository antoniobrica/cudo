import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
 
@InputType()
export class MeetingBasicDetailsInput {

  @IsString()
  @IsNotEmpty()
  @Field({ description: `This is for company Id`, nullable: true })
  companyId?: string;

  @IsString()
  @IsNotEmpty()
  @Field({ description: `This is for project Type Id`, nullable: true })
  projectTypeId?: string;

  
  @Field({ description: `This is for work Type Id`, nullable: true })
  workTypeId?: string;

  // @IsString()
  // @IsNotEmpty()
  @Field({ description: `This is for session Id`, nullable: true })
  sessionId?: string;

  // @IsString()
  // @IsNotEmpty()
  @Field({ description: `This is for meeting title`  })
  meetingTitle: string;
  
  @Field({ description: `This is for meeting Date` })
  meetingDate: Date;

  @Field({ description: `This is for meeting Start Time` })
  meetingStartTime: Date;

  @Field({ description: `This is for meeting End Time` })
  meetingEndTime: Date;

  @Field({ description: `This is for invite Guests`, nullable: true })
  inviteGuests?: string;

  @Field({ description: `This is for meeting Description`, nullable: true })
  meetingDescription?: string;

  @Field({ description: `This is for protocol Id`, nullable: true })
  protocolId?: string;

  @Field({ description: `This is for protocol Title`, nullable: true })
  protocolTitle?: string;

  @Field({ description: `This is for meeting Duration`, nullable: true })
  meetingDuration: string;

  @Field({ description: `This is for meeting status`, nullable: true })
  status: string;

}

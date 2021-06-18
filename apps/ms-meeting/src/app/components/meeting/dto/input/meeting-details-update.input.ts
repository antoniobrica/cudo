import { Optional } from "@nestjs/common";
import { Field, InputType } from "@nestjs/graphql";
import MemberParams from "../../../../utils/types/member.params"; 
import MeetingFilesParams from "../../../../utils/types/meetingFiles.params"; 
import { MeetingBasicDetailsUpdateInput } from "./meeting-basic-details-update.input";

@InputType()
export class MeetingDetailsUpdateInput {

    @Field(type => MeetingBasicDetailsUpdateInput)
    meetingBasics?: MeetingBasicDetailsUpdateInput;
    
    @Field(type => [MemberParams], {nullable:true, description: `This is for members in meeting` })
    @Optional()
    members?: MemberParams[];

    @Field(type => [MeetingFilesParams], {nullable:true, description: `This is for files in meeting` })
    @Optional()
    meetingFiles?: MeetingFilesParams[];
}

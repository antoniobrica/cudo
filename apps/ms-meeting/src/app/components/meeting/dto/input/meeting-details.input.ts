import { Field, InputType } from "@nestjs/graphql";
import MemberParams from "apps/ms-meeting/src/app/utils/types/member.params"; 
import MeetingFilesParams from "../../../../utils/types/meetingFiles.params";
import { MeetingBasicDetailsInput } from "./meeting-basic-details.input";

@InputType()
export class MeetingDetailsInput {

    @Field(type => MeetingBasicDetailsInput, { description: `This is for meeting basic details`, nullable:true })
    meetingBasics?: MeetingBasicDetailsInput;
    
    @Field(type => [MemberParams], { description: `This is for members in meeting`, nullable:true })
    members?: MemberParams[];

    @Field(type => [MeetingFilesParams], { description: `This is for files in meeting`, nullable:true })
    meetingFiles?: MeetingFilesParams[];
}

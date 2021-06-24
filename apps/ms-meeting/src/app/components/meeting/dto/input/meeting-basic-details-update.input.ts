import { Field, InputType, PartialType } from "@nestjs/graphql";
import { MeetingBasicDetailsInput } from "./meeting-basic-details.input";

@InputType()
export class MeetingBasicDetailsUpdateInput extends PartialType(MeetingBasicDetailsInput) {

    @Field({ description: `This is for title meetingId` })
    meetingId: string;
}

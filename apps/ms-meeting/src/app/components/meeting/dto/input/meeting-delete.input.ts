import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class MeetingDeleteInput {

    @Field({ description: `meetingId` })
    meetingId: string;
}

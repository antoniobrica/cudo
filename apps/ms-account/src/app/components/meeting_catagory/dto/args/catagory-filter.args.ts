import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class MeetingCatagoryFilterArgs {

    @Field({ description: `filetype ID` })
    meetingCatagoryID?: string;
}

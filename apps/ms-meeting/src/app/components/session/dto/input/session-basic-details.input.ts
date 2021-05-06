import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SessionBasicDetailsInput {

    @Field({ description: `This is for session title` })
    sessionTitle?: string;

    @Field({ description: `This is for worktype ID` })
    worktypeID?: string;

    @Field({ description: `WorkType Title` })
    worktypeTitle?: string;

    @Field({ description: `Meeting Category ID` })
    meetingCategoryID?: string;

    @Field({ description: `Meeting Category Title` })
    meetingCategoryTitle?: string;

    @Field({ description: `Invitation ID` })
    invitationID?: string;

    @Field({ description: `Invitation Title` })
    invitationTitle?: string;

    @Field({ description: `protocol ID` })
    protocolID?: string;

    @Field({ description: `protocol Title` })
    protocolTitle?: string;

}

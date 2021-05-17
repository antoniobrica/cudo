import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SessionBasicDetailsInput {

    @Field({ description: `This is for session title`  })
    sessionTitle: string;

    @Field({ description: `This is for worktype ID`, nullable: true })
    worktypeID?: string;

    @Field({ description: `WorkType Title`, nullable: true })
    worktypeTitle?: string;

    @Field({ description: `Meeting Category ID`, nullable: true })
    meetingCategoryID?: string;

    @Field({ description: `Meeting Category Title`, nullable: true })
    meetingCategoryTitle?: string;

    @Field({ description: `Invitation ID`, nullable: true })
    invitationID?: string;

    @Field({ description: `Invitation Title`, nullable: true })
    invitationTitle?: string;

    @Field({ description: `protocol ID`, nullable: true })
    protocolID?: string;

    @Field({ description: `protocol Title`, nullable: true })
    protocolTitle?: string;

}

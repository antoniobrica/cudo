import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class InvitationTemplateFilterArgs {

    @Field({ description: `Invitation Template ID` })
    invitationTemplateID?: string;
}

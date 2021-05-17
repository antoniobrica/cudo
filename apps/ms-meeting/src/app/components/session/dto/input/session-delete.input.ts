import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class SessionDeleteInput {

    @Field({ description: `sessionID` })
    sessionID: string;
}

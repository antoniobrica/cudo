import { Field, InputType, PartialType } from "@nestjs/graphql";
import { SessionBasicDetailsInput } from "./session-basic-details.input";

@InputType()
export class SessionBasicDetailsUpdateInput extends PartialType(SessionBasicDetailsInput) {

    @Field({ description: `This is for title taskID` })
    sessionID: string;
}

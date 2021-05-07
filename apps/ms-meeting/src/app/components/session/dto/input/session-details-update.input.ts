import { Optional } from "@nestjs/common";
import { Field, InputType } from "@nestjs/graphql";
import MemberParams from "../../../../utils/types/member.params";
import PeopleParams from "../../../../utils/types/peopleParams";
import { SessionBasicDetailsUpdateInput } from "./session-basic-details-update.input";

@InputType()
export class SessionDetailsUpdateInput {

    @Field(type => SessionBasicDetailsUpdateInput)
    sessionBasics?: SessionBasicDetailsUpdateInput;

    @Field(type => [PeopleParams], {nullable:true, description: `admins for meeting` })
    @Optional()
    admins?: PeopleParams[];

    @Field(type => [MemberParams], {nullable:true, description: `members for meeting` })
    @Optional()
    members?: MemberParams[];

}

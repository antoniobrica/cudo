import { Field, InputType } from "@nestjs/graphql";
import MemberParams from "apps/ms-meeting/src/app/utils/types/member.params";
import PeopleParams from "../../../../utils/types/peopleParams";
import { SessionBasicDetailsInput } from "./session-basic-details.input";

@InputType()
export class SessionDetailsInput {

    @Field(type => SessionBasicDetailsInput, { description: `session`,nullable:true })
    sessionBasics?: SessionBasicDetailsInput;

    @Field(type => [PeopleParams], { description: `admins for session`,nullable:true })
    admins?: PeopleParams[];

    @Field(type => [MemberParams], { description: `Task Followers`,nullable:true })
    members?: MemberParams[];

}

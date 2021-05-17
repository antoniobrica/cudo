import { Field, InputType } from "@nestjs/graphql";
import PeopleParams from "../../../../utils/types/peopleParams";
@InputType()
export class TaskFollowersInput {

    @Field(type => [PeopleParams], { description: `This is for title task title` })
    followers?: PeopleParams[];
}

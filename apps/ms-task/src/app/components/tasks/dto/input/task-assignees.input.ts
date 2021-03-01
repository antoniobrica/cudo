import { Field, InputType } from "@nestjs/graphql";
import PeopleParams from "../../../../utils/types/peopleParams";
@InputType()
export class TaskAssigneesInput {

    @Field(type => [PeopleParams], { description: `This is for title task title` })
    assignees?: PeopleParams[];
}

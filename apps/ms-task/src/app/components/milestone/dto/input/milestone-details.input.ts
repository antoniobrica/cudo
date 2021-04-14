import { Field, InputType } from "@nestjs/graphql";
import PeopleParams from "../../../../utils/types/peopleParams";
import { TaskBasicDetailsInput } from "./task-basic-details.input";
@InputType()
export class TaskDetailsInput {

    @Field(type => TaskBasicDetailsInput)
    taskBasics?: TaskBasicDetailsInput;

    @Field(type => [PeopleParams], { description: `This is for title task title` })
    followers?: PeopleParams[];

    @Field(type => [PeopleParams], { description: `This is for title task title` })
    assignees?: PeopleParams[];
}

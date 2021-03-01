import { Field, InputType } from "@nestjs/graphql";
import PeopleParams from "apps/ms-task/src/app/utils/types/peopleParams";
import { TaskAssigneesInput } from "./task-assignees.input";
import { TaskBasicDetailsInput } from "./task-basic-details.input";
import { TaskFollowersInput } from "./task-followers.input";
@InputType()
export class TaskDetailsInput {

    @Field(type => TaskBasicDetailsInput)
    taskBasics?: TaskBasicDetailsInput;

    @Field(type => [PeopleParams], { description: `This is for title task title` })
    followers?: PeopleParams[];

    @Field(type => [PeopleParams], { description: `This is for title task title` })
    assignees?: PeopleParams[];
}

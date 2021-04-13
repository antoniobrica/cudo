import { Field, InputType } from "@nestjs/graphql";
import TaskFileParams from "../../../../utils/types/fileParam";
import PeopleParams from "../../../../utils/types/peopleParams";
import { TaskBasicDetailsInput } from "./task-basic-details.input";
@InputType()
export class TaskDetailsInput {

    @Field(type => TaskBasicDetailsInput)
    taskBasics?: TaskBasicDetailsInput;

    @Field(type => [PeopleParams], { description: `Task Followers` })
    followers?: PeopleParams[];

    @Field(type => [PeopleParams], { description: `Task Assignees` })
    assignees?: PeopleParams[];

    @Field(type => [TaskFileParams], { description: `Task Files` })
    files?: TaskFileParams[];
}

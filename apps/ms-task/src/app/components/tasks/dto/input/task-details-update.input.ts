import { Optional } from "@nestjs/common";
import { Field, InputType } from "@nestjs/graphql";
import SubTaskParams from "apps/ms-task/src/app/utils/types/subtask.param.";
import TaskFileParams from "../../../../utils/types/fileParam";
import PeopleParams from "../../../../utils/types/peopleParams";
import { TaskBasicDetailsUpdateInput } from "./task-basic-details-update.input";
@InputType()
export class TaskDetailsUpdateInput {

    @Field(type => TaskBasicDetailsUpdateInput)
    taskBasics?: TaskBasicDetailsUpdateInput;

    @Field(type => [PeopleParams], {nullable:true, description: ` Task Followers` })
    @Optional()
    followers?: PeopleParams[];

    @Field(type => [PeopleParams], {nullable:true, description: `Task Assignee` })
    @Optional()
    assignees?: PeopleParams[];

    @Field(type => [TaskFileParams], {nullable:true, description: `Task Files` })
    files?: TaskFileParams[];

    @Field(type => [SubTaskParams], {nullable:true, description: `subtask` })
    subtasks?: SubTaskParams[];
}

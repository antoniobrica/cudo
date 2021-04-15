import { Field, InputType } from "@nestjs/graphql";
import TaskFileParams from "apps/ms-task/src/app/utils/types/fileParam";
import WorkTypeParams from "apps/ms-task/src/app/utils/types/worktypeParam";
import { MilestoneBasicDetailsInput } from "./milestone-basic-details.input";

@InputType()
export class MilestoneDetailsInput {

    @Field(type => MilestoneBasicDetailsInput)
    milestoneBasics?: MilestoneBasicDetailsInput;

    @Field(type => [TaskFileParams], { description: `Task Files` })
    files?: TaskFileParams[];

    @Field(type => [WorkTypeParams], { description: `Task Files` })
    worktypes?: WorkTypeParams[];

}

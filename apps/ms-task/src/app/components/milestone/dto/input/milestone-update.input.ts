import { Optional } from "@nestjs/common";
import { Field, InputType } from "@nestjs/graphql";
import TaskFileParams from "apps/ms-task/src/app/utils/types/fileParam";
import WorkTypeParams from "apps/ms-task/src/app/utils/types/worktypeParam";
import { MileStoneBasicDetailsUpdateInput } from "./milestone-update";

@InputType()
export class MileStoneDetailsUpdateInput {

    @Field(type => MileStoneBasicDetailsUpdateInput)
    milestoneBasics?: MileStoneBasicDetailsUpdateInput;

    @Field(type => [TaskFileParams], {nullable:true, description: `Task Files` })
    @Optional()
    files?: TaskFileParams[];

    @Field(type => [WorkTypeParams], {nullable:true, description: `Task Files` })
    @Optional()
    worktypes?: WorkTypeParams[];
}

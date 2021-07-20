import { Field, InputType } from "@nestjs/graphql";
import TaskFileParams from "../../../../utils/types/fileParam";
import WorkTypeParams from "../../../../utils/types/worktypeParam";
import { MilestoneBasicDetailsInput } from "./milestone-basic-details.input";

@InputType()
export class MilestoneDetailsInput {

    @Field(type => MilestoneBasicDetailsInput)
    milestoneBasics?: MilestoneBasicDetailsInput;

    @Field(type => [TaskFileParams], { nullable:true, description: `Task Files` })
    files?: TaskFileParams[];

}

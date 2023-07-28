import { Field, InputType } from "@nestjs/graphql";
import { StatusEnum } from "../../../../enums/status.enum";

@InputType()
export class MilestoneBasicDetailsInput {

    @Field({ description: `This is for milestone title` })
    milestoneTitle?: string;

    @Field({ description: `Due Date of MileStone in UTC` })
    dueDate?: Date;

    @Field({ nullable:true, description: `description of milestone created` })
    description?: string;

    @Field({ description: `PhaseID attached with milestone` })
    phaseID?: string;

    @Field({ description: `PhaseID attached with milestone` })
    phaseName?: string;

    @Field({ description: `PhaseID attached with milestone` })
    worktypeID?: string;

    @Field({ description: `PhaseID attached with milestone` })
    worktypeName?: string;

    @Field(type => StatusEnum, { nullable:true, description: `PhaseID attached with milestone` })
    status?: StatusEnum;

}

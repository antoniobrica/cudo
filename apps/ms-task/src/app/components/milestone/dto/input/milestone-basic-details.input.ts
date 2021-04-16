import { Field, InputType } from "@nestjs/graphql";
import { StatusEnum } from "../../../../enums/status.enum";

@InputType()
export class MilestoneBasicDetailsInput {

    // @Field({ description: `This is for milestone title` })
    // milestoneID?: string;

    @Field({ description: `This is for milestone title` })
    milestoneTitle?: string;

    @Field({ description: `Due Date of MileStone in UTC` })
    dueDate?: Date;

    @Field({ description: `description of milestone created` })
    description?: string;

    @Field({ description: `PhaseID attached with milestone` })
    phasesID?: string;

}

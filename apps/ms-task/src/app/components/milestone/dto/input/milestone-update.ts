import { Field, InputType, PartialType } from "@nestjs/graphql";
import { MilestoneBasicDetailsInput } from "./milestone-basic-details.input";

@InputType()
export class MileStoneBasicDetailsUpdateInput extends PartialType(MilestoneBasicDetailsInput) {

    @Field({ description: `This is for title milestoneID UUID` })
    milestoneID: string;
}

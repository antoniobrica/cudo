import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class BKPcostDeleteInput {

    @Field({ description: `This is for BKPcostID` })
    bkpCostID: string;
}BKPcostDeleteInput

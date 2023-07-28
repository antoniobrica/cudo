import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class CostDeleteInput {

    @Field({ description: `This is for costID` })
    costID: string;
}CostDeleteInput

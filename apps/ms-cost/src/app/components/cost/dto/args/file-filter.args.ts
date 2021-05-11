import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class CostFilterArgs {

    @Field({ description: `cost ID` })
    costTitle?: string;
}

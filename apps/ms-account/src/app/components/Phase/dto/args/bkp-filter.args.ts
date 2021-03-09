import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class BkpFilterArgs {

    @Field({ description: `BKP ID` })
    phaseID?: string;
}

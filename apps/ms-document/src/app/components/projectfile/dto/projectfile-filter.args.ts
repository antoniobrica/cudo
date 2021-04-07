import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class PhaseFilterArgs {

    @Field({ description: `BKP ID` })
    projectFileId?: string;
}

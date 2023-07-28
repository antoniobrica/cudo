import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class StructureFilterArgs {

    @Field({ description: `Structure ID` })
    structureID?: string;
}

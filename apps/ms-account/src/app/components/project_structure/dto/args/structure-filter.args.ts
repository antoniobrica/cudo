import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class StructureFilterArgs {

    @Field({ description: `filetype ID` })
    structureID?: number;
}

import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class FileStructureFilterArgs {

    @Field({ description: `fileStructure ID` })
    fileStructureID?: string;
}

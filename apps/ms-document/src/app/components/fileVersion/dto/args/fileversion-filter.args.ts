import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class FileVersionFilterArgs {

    @Field({ description: `file ID` })
    fileID?: string;
}

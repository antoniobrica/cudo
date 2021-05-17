import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class FileFilterArgs {

    @Field({ description: `file ID` })
    fileID?: string;
}

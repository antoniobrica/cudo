import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class FileTypeFilterArgs {

    @Field({ description: `filetype ID` })
    fileTypeID?: string;
}

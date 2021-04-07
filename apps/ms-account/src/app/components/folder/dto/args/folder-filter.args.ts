import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class FolderFilterArgs {

    @Field({ description: `filetype ID` })
    folderID?: string;
}

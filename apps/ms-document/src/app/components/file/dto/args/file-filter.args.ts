import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class FileFilterArgs {
    @Field({ nullable: true, description: `Uploaded file ID` })
    uploadedFileID?: string;
}

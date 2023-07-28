import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class FileDeleteInput {

    @Field({ description: `This is for fileID` })
    uploadedFileID: string;
}

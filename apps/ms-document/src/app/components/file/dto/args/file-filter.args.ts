import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class FileFilterArgs {
    @Field({ nullable: true, description: `file ID` })
    fileId?: string;
}

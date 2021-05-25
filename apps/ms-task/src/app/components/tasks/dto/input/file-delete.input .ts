import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class FileFilterInput {

    @Field({ description: `This is for title taskID` })
    fileID: string;
}

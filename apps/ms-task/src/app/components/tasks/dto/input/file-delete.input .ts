import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class FileFilterInput {

    @Field({ description: `taskFile ID as UUID` })
    taskFileID: string;
}

import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class SubTaskFilterInput {

    @Field({ description: `This is for title taskID` })
    subtaskID: string;
}

import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class TaskDeleteInput {

    @Field({ description: `This is for title taskID` })
    taskID: string;
}

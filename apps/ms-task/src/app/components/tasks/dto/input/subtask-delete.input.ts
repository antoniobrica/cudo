import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class SubTaskDeleteInput {

    @Field({ description: `This is for title taskID` })
    subtaskID: string;
}

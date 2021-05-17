import { Field, InputType, PartialType } from "@nestjs/graphql";
import { TaskBasicDetailsInput } from "./task-basic-details.input";
@InputType()
export class TaskBasicDetailsUpdateInput extends PartialType(TaskBasicDetailsInput) {

    @Field({ description: `This is for title taskID` })
    taskID: string;
}

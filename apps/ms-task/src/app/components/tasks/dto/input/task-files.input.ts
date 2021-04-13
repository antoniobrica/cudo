import { Field, InputType } from "@nestjs/graphql";
import TaskFileParams from "../../../../utils/types/fileParam";
@InputType()
export class TaskFileInput {

    @Field(type => [TaskFileParams], { description: `This is for title task title` })
    files?: TaskFileParams[];
}

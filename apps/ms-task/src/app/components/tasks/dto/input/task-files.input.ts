import { Field, InputType } from "@nestjs/graphql";
import TaskFileParams from "apps/ms-task/src/app/utils/types/fileParam";
@InputType()
export class TaskFileInput {

    @Field(type => [TaskFileParams], { description: `This is for title task title` })
    files?: TaskFileParams[];
}

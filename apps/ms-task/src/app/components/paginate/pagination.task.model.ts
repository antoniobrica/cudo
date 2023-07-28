import { Field, ObjectType } from "@nestjs/graphql";
import { TasksModel } from "../tasks/models/tasks.model";


@ObjectType()
export class PaginationTaskModel {

    @Field(type=>[TasksModel], { nullable: true })
    results: TasksModel[]
    
    @Field({ nullable: true, description: `Total Entries` })
    total: number;

    @Field({ nullable: true, description: `This is for title taskID` })
    next?: string;

    @Field({ nullable: true, description: `This is for title taskID` })
    previous?: string;

    @Field({ nullable: true, description: `Total Entries on a single page` })
    page_total?: string;

    @Field({ nullable: true, description: `if more page exist` })
    hasNextPage?: Boolean;
  }
  
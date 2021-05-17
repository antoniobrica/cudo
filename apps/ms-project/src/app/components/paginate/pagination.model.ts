import { Field, ObjectType } from "@nestjs/graphql";
import { ProjectModel } from "../projects/model/project";



@ObjectType()
export class PaginationModel {

    @Field(type=>[ProjectModel], { nullable: true })
    results: ProjectModel[]
    
    @Field({ nullable: true, description: `Total Entries` })
    total: number;

    @Field({ nullable: true, description: `Total Entries on a single page` })
    page_total?: string;

  }
  
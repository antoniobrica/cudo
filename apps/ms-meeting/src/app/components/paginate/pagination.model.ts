import { Field, ObjectType } from "@nestjs/graphql";
import { SessionModel } from "../session/model/session.model";



@ObjectType()
export class PaginationModel {

    @Field(type=>[SessionModel], { nullable: true })
    results: SessionModel[]
    
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
  
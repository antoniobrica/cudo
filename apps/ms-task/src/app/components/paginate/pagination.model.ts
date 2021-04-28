import { Field, ObjectType } from "@nestjs/graphql";
import { type } from "os";
import { MileStoneEntity } from "../../entities/milestone.entity";
import { MileStoneModel } from "../milestone/model/milestone.model";



@ObjectType()
export class PaginationModel {

    @Field(type=>[MileStoneModel], { nullable: true })
    results: MileStoneModel[]
    
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
  
import { Field, ObjectType } from "@nestjs/graphql";
import { ProtocolModel } from "../protocol/model/protocol.model";

@ObjectType()
export class PaginationProtocolModel {

    @Field(type=>[ProtocolModel], { nullable: true })
    results: ProtocolModel[]
    
    @Field({ nullable: true, description: `Total Entries` })
    total: number;

    @Field({ nullable: true, description: `This is for title protocolID` })
    next?: string;

    @Field({ nullable: true, description: `This is for title protocolID` })
    previous?: string;

    @Field({ nullable: true, description: `Total Entries on a single page` })
    page_total?: string;

    @Field({ nullable: true, description: `if more page exist` })
    hasNextPage?: Boolean;
  }
  
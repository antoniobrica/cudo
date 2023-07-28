import { Field, ObjectType } from "@nestjs/graphql";
import { MeetingModel } from "../meeting/model/meeting.model";


@ObjectType()
export class PaginationMeetingModel {

    @Field(type=>[MeetingModel], { nullable: true })
    results: MeetingModel[]
    
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
  
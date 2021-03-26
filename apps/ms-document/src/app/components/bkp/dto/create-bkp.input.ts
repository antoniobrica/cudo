import { number, string } from "@hapi/joi";
import { Field, InputType } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class CreateBkpInput {

    @Field()
    @Column()
    bkpId: number;

    @Field(() => string)
    @Column()
    bkpTitle: string;

}
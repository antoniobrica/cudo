import { number, string } from "@hapi/joi";
import { Field, InputType } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class CreateBkpInput {

    @Field({nullable:true})
    @Column()
    BKPID: string;

    @Field()
    @Column()
    bkpTitle: string;

}
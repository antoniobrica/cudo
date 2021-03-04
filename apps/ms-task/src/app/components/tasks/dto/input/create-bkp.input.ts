import { number, string } from "@hapi/joi";
import { Field, InputType } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class CreateBkpInput {

    @Field(() => string)
    @Column()
    bkpTitle: string;

    @Field(()=> number)
    @Column()
    companyId: number;  

    @Field()
    @Column()
    clientId: number;
}
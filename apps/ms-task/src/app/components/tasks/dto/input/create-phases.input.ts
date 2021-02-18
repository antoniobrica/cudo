import { number, string } from "@hapi/joi";
import { Field, InputType } from "@nestjs/graphql";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class CreatePhaseInput {

    @Field(() => string)
    @Column()
    phaseTitle: string;

    @Field(()=> number)
    @Column()
    companyId: number;  

    @Field()
    @Column()
    clientId: number;
}
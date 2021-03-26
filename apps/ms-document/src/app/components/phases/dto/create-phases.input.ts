import { string } from "@hapi/joi";
import { Field, InputType } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class CreatePhaseInput {

    @Field()
    @Column()
    phaseId: number;

    @Field(() => string)
    @Column()
    phaseTitle: string;

}
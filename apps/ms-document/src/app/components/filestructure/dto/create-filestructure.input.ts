import { number, string } from "@hapi/joi";
import { Field, InputType } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class CreateFileStructureInput {

    @Field()
    @Column()
    structureId: number;

    @Field(() => string)
    @Column()
    structureTitle: string;

}
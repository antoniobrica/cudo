import { number, string } from "@hapi/joi";
import { Field, InputType } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class CreateFileUserInput {

    @Field()
    @Column()
    userId: number;

    @Field(() => string)
    @Column()
    userName: string;

    @Field(() => string,{nullable:true})
    @Column()
    imageUrl: string;

}
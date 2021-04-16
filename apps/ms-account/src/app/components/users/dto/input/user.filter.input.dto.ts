import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { OneToMany } from "typeorm";

@InputType()
export class UserFilterInputDto {

    @Field({ description: `User ID` })
    email: string;
}

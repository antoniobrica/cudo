import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { OneToMany } from "typeorm";

@InputType()
export class UserInputDto {

    @Field({ description: `User ID` })
    userID: string;

    @Field({ description: `User Name` })
    userName: string;

    @Field({ description: `User Name` })
    email: string;

}

import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { OneToMany } from "typeorm";

@InputType()
export class CountryInputDto {

    @Field({ description: `Reference type name` })
    countryName: string;

    @Field({ description: `Reference type name` })
    countryCode: string;

}

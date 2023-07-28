import { Field, InputType } from "@nestjs/graphql";
import { ReferenceTypeEnum } from "../../../../enums/company-type.enum";
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { OneToMany } from "typeorm";

@InputType()
export class ReferenceInputDto {

    @Field({ description: `ReferenceID is for work` })
    referenceID: string;

    @Field(type => ReferenceTypeEnum)
    referenceType: ReferenceTypeEnum;

    @Field({ description: `Reference name` })
    name: string;

    @Field({ description: `ReferenceID imageUrl` })
    imageUrl: string;
}

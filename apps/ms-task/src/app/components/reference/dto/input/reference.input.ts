import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { OneToMany } from "typeorm";

@InputType()
export class ReferenceInput {

    @Field({ description: `This is for title task title` })
    referenceID: string;

    @Field({ description: `This is for title task title` })
    referenceType: string;

    @Field({ description: `This is for title task title` })
    createdBy?: string;

    @Field({ description: `This is for title task title` })
    updatedBy?: string;

    @Field({ description: `This is for title task title` })
    isDeleted?: boolean;

    // 1:n relation with TasksEntity 
    @Field({ description: `This is for title task title` })
    tasks: string[];
}

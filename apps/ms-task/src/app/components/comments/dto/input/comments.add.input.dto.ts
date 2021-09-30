import { Field, InputType } from "@nestjs/graphql";
// import { IsNotEmpty, IsOptional, Length } from 'class-validator';
// import { OneToMany } from "typeorm";

@InputType()
export class CommentsCreateInputDto {

    @Field({ description: `comments in a task` })
    taskID: string;

    @Field({ description: `comment message` })
    comment: string;

    @Field({ nullable: true, description: `Comment created by user name` })
    createdBy?: string;

    @Field({ nullable: true, description: `Comment created by user email` })
    createdByEmail?: string;

    @Field({ nullable: true, description: `Comment created by user profile url` })
    createdByUrl?: string;
    
}

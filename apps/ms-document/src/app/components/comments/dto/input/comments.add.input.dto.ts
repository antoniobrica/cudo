import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { OneToMany } from "typeorm";

@InputType()
export class CommentsCreateInputDto {

    @Field({ description: `comments in a file` })
    uploadedFileID: string;

    @Field({ description: `comment message` })
    comment: string;

    @Field({ nullable: true, description: `Comment created by user` })
    createdBy?: string;
    
}

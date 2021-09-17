import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { OneToMany } from "typeorm";
import { StatusEnum } from "../../../../enum/status.enum";

@InputType()
export class PinsShiftUpdateInputDto {

    @Field({ description: `FileID is for work and building` })
    uploadedFileID: string;    
}

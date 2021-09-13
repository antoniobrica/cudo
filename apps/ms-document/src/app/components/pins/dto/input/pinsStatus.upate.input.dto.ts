import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { OneToMany } from "typeorm";
import { StatusEnum } from "../../../../enum/status.enum";

@InputType()
export class PinsStatusUpdateInputDto {
    
    @Field(type => StatusEnum, { nullable: true, description: `Pin status` })
    status?: StatusEnum;
}

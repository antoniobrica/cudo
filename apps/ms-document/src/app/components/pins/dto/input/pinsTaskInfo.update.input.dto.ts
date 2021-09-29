import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { OneToMany } from "typeorm";
import { StatusEnum } from "../../../../enum/status.enum";

@InputType()
export class PinsTaskInfoUpdateInputDto {

    @Field({ description: `taskID is for task reference` })
    taskID: string;    
    
    @Field({ description: `taskID is for task reference` })
    taskTitle: string;    

    @Field(type => StatusEnum, { nullable: true, description: `Pin status` })
    status?: StatusEnum;
}
